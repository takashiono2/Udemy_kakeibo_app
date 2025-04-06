import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import '../calendar.css'
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, CalendarContent, Transaction } from '../types'
import { calculateDailyBalances } from '../utils/financeCalcurations'
import { formatCurrency } from '../utils/formattings'

interface CalendarProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const Calendar = ({ monthlyTransactions, setCurrentMonth }: CalendarProps) => {

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div>
          <div className="money" id="event-income">{eventInfo.event.extendedProps.income}</div>
        </div>
        <div>
          <div className="money" id="event-expense">{eventInfo.event.extendedProps.expese}</div>
        </div>
        <div>
          <div className="money" id="event-balance">{eventInfo.event.extendedProps.balance}</div>
        </div>
      </div>
    )
  }

  const dailyBalances = calculateDailyBalances(monthlyTransactions)

  const createCalendarEvents = (dailyBalances: Record<string, Balance>): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const { income, expense, balance } = dailyBalances[date]
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance)
      }
    })
  }

  const handleDateSet = (datesSetInfo: DatesSetArg) => {
    setCurrentMonth(datesSetInfo.view.currentStart);
  }

  const calendarEvents = createCalendarEvents(dailyBalances);

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
    />
  )
}

export default Calendar