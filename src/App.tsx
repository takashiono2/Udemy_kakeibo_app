import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';
import { Transaction } from './types';
import { formatMonth } from './utils/formattings';
// import { ThemeProvider } from '@mui/material/styles';
function App() {
  // errはobjectであり、nullではない、errにはcodeが含まれる
  function isFirebaseError(err: unknown): err is { code: string, message: string } {
    return typeof err === 'object' && err !== null && 'code' in err && 'message' in err;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  console.log("currentMonth: ", currentMonth);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction;
        });
        setTransactions(transactionsData)
        console.log("transactions: ", transactionsData);
      } catch (err) {
        if (isFirebaseError(err)) {
          console.error("firestoreのエラー： ", err);
        } else {
          console.error("一般的なエラー： ", err);
        }
      }
    }
    fetchTransactions();
  }, []);

  // eslint-disable-next-line array-callback-return
  const monthlyTransactions = transactions.filter((transaction) =>
    transaction.date.startsWith(formatMonth(currentMonth)));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} />} />
            <Route path="/report" element={<Report />} />
            <Route path="/*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
