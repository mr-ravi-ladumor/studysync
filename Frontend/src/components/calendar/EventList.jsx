import React, { useState, useEffect } from "react";
import { CalendarIcon, Pencil, Trash2 } from "lucide-react";
import { format, isSameDay, isToday, isTomorrow , differenceInCalendarDays} from "date-fns";
import EditEvent from "./EditEvent.jsx";
import DeleteEvent from "./DeleteEvent.jsx";

const formatRange = (startDate, endDate) => {

    let formattedString = "";
    const startTime = format(startDate, "hh:mm a");
    const endTime = format(endDate, "hh:mm a");

    if (isSameDay(startDate, endDate)) {
        if (isToday(startDate)) {
            formattedString = `Today, ${startTime} - ${endTime}`;
        } else if (isTomorrow(startDate)) {
            formattedString = `Tomorrow, ${startTime} - ${endTime}`;
        } else {
            formattedString = `${format(
                startDate,
                "dd MMM"
            )}, ${startTime} - ${endTime}`;
        }
    } else {
        let startLabel = "";
        if (isToday(startDate)) startLabel = "Today";
        else if (isTomorrow(startDate)) startLabel = "Tomorrow";
        else startLabel = format(startDate, "dd MMM");

        const endLabel = format(endDate, "dd MMM");

        formattedString = `${startLabel}, ${startTime} - ${endLabel}, ${endTime}`;
    }

    return formattedString;
};

const getRelativeDayLabel = (startDate) => {
    const today = new Date();

    if (isToday(startDate)) {
        return "Today";
    }

    if (isTomorrow(startDate)) {
        return "Tomorrow";
    }

    const diff = differenceInCalendarDays(startDate, today);

    if (diff > 1) {
        return `In ${diff} days`;
    } else if (diff < 0) {
        return `${Math.abs(diff)} day${Math.abs(diff) > 1 ? "s" : ""} ago`;
    }

    return "Unknown";
};

function EventList({ calendarEvents, setCalendarEvents }) {
    const [showEditEvent, setShowEditEvent] = useState(false);
    const [showDeleteEvent, setShowDeleteEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    if (calendarEvents.length) {
        const d = calendarEvents[0].endDateTime;
    }

    useEffect(() => {
        const fetchCalendarEvents = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/calendar`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch Events");
                }
                const allEventsData = await response.json();
                const transformedEvents = allEventsData.data.map(event => ({
                    ...event, 
                    startDateTime: new Date(event.startDateTime),
                    endDateTime: new Date(event.endDateTime)
                }));
                setCalendarEvents(transformedEvents);
                console.log("Events fetched successfully:", transformedEvents);
            } catch (error) {
                console.error("Error fetching Events:", error);
            }
        };
        fetchCalendarEvents();
    }, []);

    return (
        <div className="bg-white flex flex-col gap-4">
            <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>

            {calendarEvents.length == 0 ? (
                <div className="text-gray-500 text-center py-8">
                    No Eventds yet. Click ‘Add Event’ to get started!
                </div>
            ) : (
                calendarEvents.map((event) => (
                    <div
                        key={event._id}
                        className="flex  items-start  gap-5 rounded-lg border-1 border-green-500 bg-green-50 px-4 pt-3 pb-1"
                    >
                        <div className="mt-1">
                            <span className="">
                                <CalendarIcon className="bg-green-500 text-white rounded-md p-1 h-8 w-8" />
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex flex-col justify-between w-full">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium text-black">
                                        {event.title}
                                    </h3>
                                    <span className="text-green-600 text-[15px] bg-green-200 px-1 rounded-sm ">
                                        {getRelativeDayLabel(event.startDateTime)}
                                    </span>
                                </div>
                                <span className="text-[15px] text-gray-800">
                                    {formatRange(
                                        event.startDateTime,
                                        event.endDateTime
                                    )}
                                </span>
                            </div>
                            <div>
                                <p className="text-[15px] text-gray-800">
                                    Location: {event.location || "Not specified"}
                                </p>
                            </div>
                            <div className="flex gap-4 items-center">
                                <span 
                                    onClick={() => {
                                        setSelectedEvent(event);
                                        setShowEditEvent(true);
                                    }}
                                    className="flex gap-0 items-center">
                                    <Pencil className="h-4 w-4 text-gray-700" />
                                    <button className="text-gray-800 mx-2 text-[14px]  rounded">
                                        Edit
                                    </button>
                                </span>
                                <span
                                    onClick={() => {
                                        setSelectedEvent(event);
                                        setShowDeleteEvent(true);
                                    }} 
                                    className="flex items-center">
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                    <button className="text-red-600 mx-2 text-[14px]  rounded">
                                        Delete
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
            {/* Edit Event */}
            {showEditEvent && (
                <EditEvent

                />
            )}

            {/* Delete Event */}
            {showDeleteEvent && (
                <DeleteEvent
                    eventId={selectedEvent._id}
                    setCalendarEvents={setCalendarEvents}
                    setSelectedEvent={setSelectedEvent}
                    setShowDeleteEvent={setShowDeleteEvent}
                />
            )}
        </div>
    );
}

export default EventList;
