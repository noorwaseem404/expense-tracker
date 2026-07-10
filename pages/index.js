import Head from "next/head";
import ExpenseTracker from "../components/ExpenseTracker";

export default function Home() {
  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta
          name="description"
          content="A dark-mode expense tracker — Night Ledger theme."
        />
      </Head>
      <ExpenseTracker />
    </>
  );
}
