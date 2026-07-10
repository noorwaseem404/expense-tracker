import { useState, useMemo } from "react";
import { Plus, Trash2, TrendingUp, TrendingDown, Wallet } from "lucide-react";

// Font import lives in styles/globals.css, loaded once via pages/_app.js —
// keeping it there (instead of an inline <style> tag here) avoids a
// server/client hydration mismatch on the @import URL's quote characters.

const COLORS = {
  bg: "#0B0E14",
  card: "#141821",
  border: "#232935",
  text: "#EDEFF3",
  muted: "#8A93A6",
  accent: "#6C5CE7",
  accentDim: "#6C5CE733",
  income: "#2FE6A6",
  expense: "#FF5C7A",
};

const seedTx = [
  { id: 1, description: "Freelance payment", amount: 850, date: "Jul 3" },
  { id: 2, description: "Rent", amount: -420, date: "Jul 1" },
  { id: 3, description: "Groceries", amount: -76.4, date: "Jun 29" },
];

function fmt(n) {
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState(seedTx);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const { balance, income, expense } = useMemo(() => {
    let income = 0,
      expense = 0;
    for (const t of transactions) {
      if (t.amount >= 0) income += t.amount;
      else expense += Math.abs(t.amount);
    }
    return { balance: income - expense, income, expense };
  }, [transactions]);

  function handleAdd(e) {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!description.trim()) {
      setError("Add a description first.");
      return;
    }
    if (Number.isNaN(value) || value === 0) {
      setError("Enter an amount that isn't zero.");
      return;
    }
    const next = {
      id: Date.now(),
      description: description.trim(),
      amount: value,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };
    setTransactions((prev) => [next, ...prev]);
    setDescription("");
    setAmount("");
    setError("");
  }

  function handleDelete(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div
      style={{
        minHeight: "100%",
        width: "100%",
        background: COLORS.bg,
        color: COLORS.text,
        fontFamily: "'Inter', sans-serif",
        padding: "40px 20px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        input::placeholder { color: ${COLORS.muted}; }
        input:focus { outline: none; border-color: ${COLORS.accent} !important; box-shadow: 0 0 0 3px ${COLORS.accentDim}; }
        .add-btn:hover { background: #7d6ef0; }
        .add-btn:active { transform: translateY(1px); }
        .tx-row:hover { background: #171c26; }
        .del-btn { opacity: 0; transition: opacity .15s; }
        .tx-row:hover .del-btn { opacity: 1; }
        .del-btn:hover { color: ${COLORS.expense} !important; }
        @media (prefers-reduced-motion: reduce) {
          .add-btn, .del-btn, .tx-row { transition: none !important; }
        }
      `}</style>

      <div style={{ width: "100%", maxWidth: 480 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: COLORS.muted,
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 6,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <Wallet size={14} color={COLORS.accent} />
            Ledger
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              margin: 0,
            }}
          >
            Expense Tracker
          </h1>
        </div>

        {/* Balance card */}
        <div
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 14,
            padding: "26px 24px",
            marginBottom: 16,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, ${COLORS.accent}, transparent)`,
            }}
          />
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: COLORS.muted,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Current balance
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 40,
              fontWeight: 700,
              marginTop: 6,
              color: balance < 0 ? COLORS.expense : COLORS.text,
              letterSpacing: "-0.02em",
            }}
          >
            {fmt(balance)}
          </div>
        </div>

        {/* Income / Expense */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <div
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 14,
              padding: "16px 18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.muted, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <TrendingUp size={13} color={COLORS.income} />
              Income
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 600, color: COLORS.income, marginTop: 6 }}>
              {fmt(income)}
            </div>
          </div>
          <div
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 14,
              padding: "16px 18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: COLORS.muted, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <TrendingDown size={13} color={COLORS.expense} />
              Expense
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, fontWeight: 600, color: COLORS.expense, marginTop: 6 }}>
              {fmt(expense)}
            </div>
          </div>
        </div>

        {/* Transaction history */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.muted,
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            Transaction history
            <div style={{ flex: 1, height: 1, background: COLORS.border }} />
          </div>

          <div
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {transactions.length === 0 ? (
              <div style={{ padding: "28px 18px", textAlign: "center", color: COLORS.muted, fontSize: 13 }}>
                No entries yet. Add your first transaction below.
              </div>
            ) : (
              transactions.map((t, i) => (
                <div
                  key={t.id}
                  className="tx-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "13px 18px",
                    borderTop: i === 0 ? "none" : `1px solid ${COLORS.border}`,
                  }}
                >
                  <div
                    style={{
                      width: 3,
                      alignSelf: "stretch",
                      borderRadius: 2,
                      background: t.amount >= 0 ? COLORS.income : COLORS.expense,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {t.description}
                    </div>
                    <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>
                      {t.date}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 14,
                      fontWeight: 600,
                      color: t.amount >= 0 ? COLORS.income : COLORS.expense,
                    }}
                  >
                    {fmt(t.amount)}
                  </div>
                  <button
                    className="del-btn"
                    onClick={() => handleDelete(t.id)}
                    aria-label={`Delete ${t.description}`}
                    style={{
                      background: "none",
                      border: "none",
                      color: COLORS.muted,
                      cursor: "pointer",
                      padding: 4,
                      display: "flex",
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add transaction */}
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: COLORS.muted,
              marginBottom: 10,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            Add new transaction
            <div style={{ flex: 1, height: 1, background: COLORS.border }} />
          </div>

          <form
            onSubmit={handleAdd}
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 14,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: COLORS.muted,
                  marginBottom: 6,
                }}
              >
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail of transaction"
                style={{
                  width: "100%",
                  background: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: "10px 12px",
                  color: COLORS.text,
                  fontSize: 14,
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: COLORS.muted,
                  marginBottom: 6,
                }}
              >
                Transaction amount
              </label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Positive for income, negative for expense"
                style={{
                  width: "100%",
                  background: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 8,
                  padding: "10px 12px",
                  color: COLORS.text,
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              />
            </div>

            {error && (
              <div style={{ color: COLORS.expense, fontSize: 12 }}>{error}</div>
            )}

            <button
              type="submit"
              className="add-btn"
              style={{
                background: COLORS.accent,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "12px 16px",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background .15s, transform .1s",
              }}
            >
              <Plus size={16} />
              Add transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
