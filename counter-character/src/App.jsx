import React, { useMemo, useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [useLimit, setUseLimit] = useState(true);
  const [max, setMax] = useState(120);

  const count = text.length;

  const { status, helper } = useMemo(() => {
    if (!useLimit) return { status: "ok", helper: "No maximum limit enabled." };

    const remaining = max - count;
    const warnAt = Math.max(0, Math.floor(max * 0.8));

    if (count > max) {
      return {
        status: "danger",
        helper: `Limit exceeded by ${Math.abs(remaining)} character(s).`,
      };
    }
    if (count >= warnAt) {
      return {
        status: "warn",
        helper: `You're close. ${remaining} character(s) remaining.`,
      };
    }
    return {
      status: "ok",
      helper: `${remaining} character(s) remaining.`,
    };
  }, [useLimit, max, count]);

  const ringLabel = useLimit ? `${count}/${max}` : `${count}`;
  const barPct = useLimit ? Math.min(100, Math.round((count / max) * 100)) : 0;

  return (
    <div className="page">
      <div className="card">
        <header className="header">
          <div>
            <h1>Live Character Counter</h1>
            <p className="sub">
              Type in the box — the UI updates in real-time using React state.
            </p>
          </div>

          <div className={`counter-pill ${status}`}>
            <span className="counter-text">{ringLabel}</span>
          </div>
        </header>

        <div className="controls">
          <label className="toggle">
            <input
              type="checkbox"
              checked={useLimit}
              onChange={(e) => setUseLimit(e.target.checked)}
            />
            <span>Enable max limit</span>
          </label>

          <div className={`max-box ${useLimit ? "" : "disabled"}`}>
            <label className="max-label" htmlFor="maxInput">
              Max
            </label>
            <input
              id="maxInput"
              type="number"
              min="1"
              value={max}
              disabled={!useLimit}
              onChange={(e) => {
                const v = Number(e.target.value);
                setMax(Number.isFinite(v) && v > 0 ? v : 1);
              }}
            />
          </div>
        </div>

        <div className="textarea-wrap">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing here..."
            className={`textarea ${status}`}
          />
          {useLimit && (
            <div className="bar">
              <div
                className={`bar-fill ${status}`}
                style={{ width: `${barPct}%` }}
              />
            </div>
          )}
        </div>

        <div className={`helper ${status}`}>{helper}</div>

        <footer className="footer">
          <button className="btn" onClick={() => setText("")}>
            Clear
          </button>
          <button
            className="btn ghost"
            onClick={() =>
              setText((prev) => prev + (prev ? "\n" : "") + "✅ Sample text!")
            }
          >
            Add sample
          </button>
        </footer>
      </div>
    </div>
  );
}