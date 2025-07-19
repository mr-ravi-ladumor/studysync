import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
    'en-US' : enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const events = [
    {
        title: 'Conference',
        start: new Date(2025, 7, 19, 10, 0, 0),
        end: new Date(2025, 7, 20, 12, 0, 0),
        allDay: false,
        desc: 'Annual tech conference',
    },
    {
        title: 'Team Meeting',
        start: new Date(2025, 7, 21, 14, 0, 0),
        end: new Date(2025, 7, 21, 15, 0, 0),
        allDay: true,
    },
]

function MyCalendar(props) {
    return (
    <>
        <Calendar
            localizer={localizer}
            events={props.events}
            startAccessor="start"
            endAccessor="end"
            defaultView='month'
            views={['month', 'week', 'day']}
            style={{ height: 500, margin: "50px" }}
        />
    </>
    )
}

function Calender() {
    const [calendarEvents, setCalendarEvents] = React.useState(events);
  return (
    <div className="h-screen flex flex-col gap-5 ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-medium">Calendar</h3>
          <p className="text-gray-600">
            Manage your schedule and never miss important deadlines.
          </p>
        </div>
        <button
          className=" bg-green-500 text-white px-4 py-1 rounded-lg flex items-center gap-2 justify-cente hover:bg-green-600 transition-colors duration-300 shadow-lg"
        >
          <span className="text-2xl mb-1">+</span> Add Event
        </button>
      </div>
      <main>
        <MyCalendar events={calendarEvents} />
      </main>
    </div>
  )
}

export default Calender
