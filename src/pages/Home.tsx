import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'

interface HomeProps {
  monthlyTransactions: Transaction[]
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 2 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calendar monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} />
      </Box>
      <Box>
        <TransactionMenu />
        <TransactionForm />
      </Box>
    </Box>
  )
}

export default Home