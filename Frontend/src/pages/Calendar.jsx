import React, { useMemo , useState} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
    format,
    parse,
    startOfWeek,
    getDay,
} from "date-fns";
import enUS from "date-fns/locale/en-US";

import { ChevronLeft, ChevronRight } from "lucide-react";
import AddEvent from "../components/calendar/AddEvent.jsx";
import EventList from "../components/calendar/EventList.jsx";

// Import default CSS first
import "react-big-calendar/lib/css/react-big-calendar.css";
// Then import our overrides
import "../index.css";

const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


// Custom Toolbar Component
const CustomToolbar = (toolbar) => {
    const goToBack = () => {
        toolbar.onNavigate("PREV");
    };

    const goToNext = () => {
        toolbar.onNavigate("NEXT");
    };

    const goToCurrent = () => {
        toolbar.onNavigate("TODAY");
    };

    const view = toolbar.view;
    const views = toolbar.views;

    return (
        <div className="p-4 flex flex-col md:flex-row justify-between items-center bg-white rounded-t-lg">
            {/* Left side: Navigation */}
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <button
                    onClick={goToCurrent}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Today
                </button>
                <div className="flex items-center">
                    <button
                        onClick={goToBack}
                        className="p-2 rounded-md hover:bg-gray-100"
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="p-2 rounded-md hover:bg-gray-100"
                    >
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Center: Date Label */}
            <div className="text-xl font-bold text-gray-800">
                {toolbar.label}
            </div>

            {/* Right side: View Switcher */}
            <div className="flex items-center border border-gray-300 rounded-md">
                {views.map((viewName) => (
                    <button
                        key={viewName}
                        onClick={() => toolbar.onView(viewName)}
                        className={`px-4 py-2 text-sm font-medium capitalize border-l border-gray-300 first:border-l-0 
                        ${
                            view === viewName
                                ? "bg-green-500 text-white"
                                : "text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                        {viewName}
                    </button>
                ))}
            </div>
        </div>
    );
};

function MyCalendar(props) {
    
    const handleSelectEvent = (event) => {
        console.log("Event clicked:", event);
    };

    const handleSelectSlot = (slotInfo) => {
        console.log("Date clicked:", slotInfo.startDateTime);
    };

    
    const today = useMemo(() => {
        return new Date(Date.now()); 
    },[])

    const eventPropGetter = (event) => {
        const category = event.category || "default";
        const colorMap = {
            work: "#3b82f6",      // Blue
            study: "#22c55e",     // Green  
            personal: "#8b5cf6",  // Purple
            meeting: "#f59e0b",   // Orange
            other: "#6b7280",     // Gray
            default: "#3b82f6"    // Blue
        };
        const backgroundColor = colorMap[category] || colorMap.default;
        return { style: { backgroundColor } };
    };

    return (
        <>
            <Calendar
                localizer={localizer}
                events={props.events}
                startAccessor="startDateTime"
                endAccessor="endDateTime"
                defaultView="month"
                views={["month", "week", "day", "agenda"]}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                popup
                showMultiDayTimes
                step={60}
                defaultDate={today}
                getNow={() => today} 
                components={{
                    toolbar: CustomToolbar,
                }}
                eventPropGetter={eventPropGetter}
                style={{
                    height: "80vh",
                    width: "100%",
                    margin: "0",
                    background: "transparent",
                    borderRadius: "0",
                    boxShadow: "none",
                }}
            />
        </>
    );
}

function Calender() {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [showAddEvent, setShowAddEvent] = useState(false);

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
                    onClick={() => setShowAddEvent(!showAddEvent)}
                    className=" bg-green-500 text-white px-4 py-1 rounded-lg flex items-center gap-2 justify-cente hover:bg-green-600 transition-colors duration-300 shadow-lg">
                    <span className="text-2xl mb-1">+</span> Add Event
                </button>
                {
                    showAddEvent && (
                        <AddEvent setShowAddEvent={setShowAddEvent} />
                    )
                }
            </div>
            <div className="bg-white rounded-lg border-1 border-gray-200 p-4">
                <MyCalendar events={calendarEvents} />
            </div>
            <div className="bg-white rounded-xl px-5 py-4 mt-4 border-1 border-gray-200">
                <EventList 
                    calendarEvents={calendarEvents} 
                    setCalendarEvents={setCalendarEvents}
                />
            </div>
        </div>
    );
}

export default Calender;
