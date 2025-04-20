import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import '../calendar.css'
import { useTheme } from '@mui/material/styles';
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, CalendarContent, Transaction } from '../types'
import { calculateDailyBalances } from '../utils/financeCalcurations'
import { formatCurrency } from '../utils/formattings'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { isSameMonth } from 'date-fns'
// import { endAt } from 'firebase/firestore'

interface CalendarProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>,
  currentDay: string,
  today: string
}
const Calendar = ({ monthlyTransactions, setCurrentMonth, setCurrentDay, currentDay, today }: CalendarProps) => {
  const theme = useTheme();

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
    const currentMonth = datesSetInfo.view.currentStart;
    setCurrentMonth(currentMonth);
    const todayDate = new Date();
    isSameMonth(todayDate, currentMonth) && setCurrentDay(today);
  }

  const calendarEvents = createCalendarEvents(dailyBalances);
  console.log('calendarEvents: ' + JSON.stringify(calendarEvents));

  const handleDateClick = (dateInfo: DateClickArg) => {
    setCurrentDay(dateInfo.dateStr);
  }

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

  const backgroundEvent = {
    start: currentDay,
    end: currentDay,
    display: 'background',
    backgroundColor: theme.palette.primary.light,
  }

  console.log(JSON.stringify([...calendarEvents, backgroundEvent]));

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={[...calendarEvents, backgroundEvent]}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
      dateClick={handleDateClick}
    />
  )
}

export default Calendar