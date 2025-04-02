import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import '../calender.css'
import { EventContentArg } from '@fullcalendar/core'

const Calender = () => {

  const events = [
    { title: 'Meeting', start: new Date(), income: 500, expese: 200, balance: 300 },
    { title: 'Meeting', start: "2025-04-01", income: 300, expese: 200, balance: 100 }
  ]

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

  //カスタムrenderEventContentの引数eventInfoの型も指定
  //1度eventInfoをconsole.logで確認してみる
  // returnでclass="money",id="event-incom", event-expense, event-balanceを指定
  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventContent={renderEventContent}
    />
  )
}

export default Calender