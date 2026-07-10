# Expense Tracker

A dark-mode fintech-styled expense tracker built with Next.js. Track income and
expenses, see your running balance, and manage a transaction history.

## Run it locally

```bash
npm i
npm run dev
```

Then open http://localhost:3000.

## Deploy

### Option A — Surge (static export)

This project is already configured for static export (`output: "export"` in
`next.config.js`), which is what Surge needs since it only serves static
files.

```bash
npm i
npm run build
npx surge out
```

`next build` will generate the static site into the `out/` folder because of
the export config — point Surge at that folder.

### Option B — Vercel (recommended if it's not a hard requirement)

Vercel runs Next.js natively, no export step needed:

```bash
npm i -g vercel
vercel
```

If you deploy to Vercel, you can optionally remove `output: "export"` from
`next.config.js` — it's only needed for static hosts like Surge.

## Push to Git

```bash
git init
git add .
git commit -m "Initial commit: expense tracker"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Project structure

```
expense-tracker/
├── components/
│   └── ExpenseTracker.jsx   # main app component
├── pages/
│   ├── _app.js              # loads global styles
│   └── index.js             # renders ExpenseTracker
├── styles/
│   └── globals.css          # font imports + reset
├── next.config.js           # static export config
├── package.json
└── .gitignore
```

## Design

**Night Ledger** theme — dark navy background, indigo accent, mint for
income, coral for expense. Headings in Space Grotesk, body in Inter, numbers
in JetBrains Mono.
