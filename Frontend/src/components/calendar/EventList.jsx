import React, { useState, useEffect } from "react";
import { CalendarIcon, Pencil, Trash2 } from "lucide-react";
import {
    format,
    isSameDay,
    isToday,
    isTomorrow,
    differenceInCalendarDays,
} from "date-fns";
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
    const themeForCategory = (cat) => {
        const c = (cat || "").toLowerCase();
        switch (c) {
            case "work":
                return {
                    card: "border-blue-300 bg-blue-50",
                    dot: "bg-blue-500",
                    badge: "bg-blue-100 text-blue-700",
                };
            case "study":
                return {
                    card: "border-emerald-300 bg-emerald-50",
                    dot: "bg-emerald-500",
                    badge: "bg-emerald-100 text-emerald-700",
                };
            case "personal":
                return {
                    card: "border-violet-300 bg-violet-50",
                    dot: "bg-violet-500",
                    badge: "bg-violet-100 text-violet-700",
                };
            case "meeting":
                return {
                    card: "border-amber-300 bg-amber-50",
                    dot: "bg-amber-500",
                    badge: "bg-amber-100 text-amber-700",
                };
            default:
                return {
                    card: "border-gray-300 bg-gray-50",
                    dot: "bg-gray-500",
                    badge: "bg-gray-100 text-gray-700",
                };
        }
    };
    const [showEditEvent, setShowEditEvent] = useState(false);
    const [showDeleteEvent, setShowDeleteEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

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
                const transformedEvents = allEventsData.data.map((event) => ({
                    ...event,
                    startDateTime: new Date(event.startDateTime),
                    endDateTime: new Date(event.endDateTime),
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
                calendarEvents.map((event) => {
                    const theme = themeForCategory(event.category);
                    return (
                        <div
                            key={event._id}
                            className={`flex items-start gap-5 rounded-lg border ${theme.card} px-4 pt-3 pb-2`}
                        >
                            <div className="mt-1">
                                <span
                                    className={`rounded-md p-1 h-8 w-8 inline-flex items-center justify-center ${theme.dot}`}
                                >
                                    <CalendarIcon className="text-white h-5 w-5" />
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex flex-col justify-between w-full">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-medium text-black">
                                            {event.title}
                                        </h3>
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded ${theme.badge}`}
                                        >
                                            {getRelativeDayLabel(
                                                event.startDateTime
                                            )}
                                        </span>
                                    </div>
                                    <span className="text-[14px] text-gray-700">
                                        {formatRange(
                                            event.startDateTime,
                                            event.endDateTime
                                        )}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2 items-center text-[14px] text-gray-700">
                                    <span className="">
                                        Location:{" "}
                                        {event.location || "Not specified"}
                                    </span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <button
                                        onClick={() => {
                                            setSelectedEvent(event);
                                            setShowEditEvent(true);
                                        }}
                                        className="flex gap-1 items-center text-gray-800 hover:text-black"
                                    >
                                        <Pencil className="h-4 w-4" />
                                        <span className="text-[14px]">
                                            Edit
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedEvent(event);
                                            setShowDeleteEvent(true);
                                        }}
                                        className="flex gap-1 items-center text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="text-[14px]">
                                            Delete
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
            {/* Edit Event */}
            {showEditEvent && (
                <EditEvent
                    eventData={selectedEvent}
                    setShowEditEvent={setShowEditEvent}
                    setSelectedEvent={setSelectedEvent}
                    setCalendarEvents={setCalendarEvents}
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
