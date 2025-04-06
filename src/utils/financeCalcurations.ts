import { Balance, Transaction } from "../types";

export function finaceCalculations(transactions: Transaction[]): Balance {
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === "income") {
      acc.income += transaction.amount;
    } else {
      acc.expense += transaction.amount;
    }
    acc.balance = acc.income - acc.expense;
    return acc;
  }, { income: 0, expense: 0, balance: 0 });
}

export function calculateDailyBalances(transactions: Transaction[]): Record<string, Balance> {
  return transactions.reduce<Record<string, Balance>>((acc, transaction) => {
    const day = transaction.date;
    if (!acc[day]) {
      acc[day] = { income: 0, expense: 0, balance: 0 };
    }

    if (transaction.type === "income") {
      acc[day].income += transaction.amount;
    } else {
      acc[day].expense += transaction.amount;
    }

    acc[day].balance = acc[day].income - acc[day].expense;
    return acc;
  }, {} as Record<string, Balance>);
}
//   // {
//   //   "2025-01-10": { income: 1000, expense: 500, balance: 500 },
//   //   "2025-01-11": { income: 0, expense: 500, balance: -500 }
//   // }