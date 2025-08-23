import React, { useEffect, useState } from "react";
import { CircleCheck, Clock4, CalendarClock, Bookmark } from "lucide-react";

function StatusCards() {
    const [summary, setSummary] = useState({
        pending: 0,
        completed: 0,
        dueToday: 0,
        upcomingEvents: 0,
        resourcesCount: 0,
        coursesCount: 0
    });

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/summary`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (!res.ok) return;
                const data = await res.json();
                const d = data.data || {};
                setSummary((prev) => ({ ...prev, ...d }));
            } catch (e) {
                // ignore
            }
        };
        fetchSummary();
    }, []);

    const completed = summary.completed || 0;
    const pending = summary.pending || 0;
    const dueToday = summary.dueToday || 0;
    const upcomingEvents = summary.upcomingEvents || 0;
    const resourcesCount = summary.resourcesCount || 0;
    const coursesCount = summary.coursesCount || 0;

    const cardsData = [
        {
            title: "Completed Tasks",
            value: completed,
            subscript: `${Math.round(
                (completed / Math.max(1, completed + pending)) * 100
            )}% complete`,
            progress: Math.min(
                100,
                Math.round((completed / Math.max(1, completed + pending)) * 100)
            ),
            icon: <CircleCheck className="text-green-500" />,
            color: "#22c55e",
        },
        {
            title: "Pending Tasks",
            value: summary.pending || 0,
            subscript: `${dueToday} due today`,
            progress: Math.min(
                100,
                Math.round((dueToday / Math.max(1, pending)) * 100)
            ),
            icon: <Clock4 className="text-yellow-500" />,
            color: "#eab308",
        },
        {
            title: "Upcoming Events",
            value: summary.upcomingEvents || 0,
            subscript: `${upcomingEvents} in next 7 days`,
            // Soft cap progress relative to 10 events
            progress: Math.min(
                100,
                Math.round((upcomingEvents / Math.max(1, 10)) * 100)
            ),
            icon: <CalendarClock className="text-blue-500" />,
            color: "#2563eb",
        },
        {
            title: "Resources Saved",
            value: summary.resourcesCount || 0,
            subscript: `across ${coursesCount} courses`,
            progress: Math.min(
                100,
                Math.round((resourcesCount / coursesCount) * 100)
            ),
            icon: <Bookmark className="text-purple-600" />,
            color: "#7c3aed",
        },
    ];

    return (
        <>
            {cardsData.map((card, index) => (
                <div
                    key={index}
                    className="card flex flex-col gap-6 w-70 bg-white p-5 rounded-xl m-1"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[17px] font-medium">
                            {card.title}
                        </span>
                        <span>{card.icon}</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold">{card.value}</span>
                        <span
                            className={`text-sm font-medium`}
                            style={{ color: card.color }}
                        >
                            {card.subscript}
                        </span>
                    </div>
                    <div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                style={{
                                    width: `${card.progress}%`,
                                    backgroundColor: card.color,
                                }}
                                className={`h-3 rounded-full`}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default StatusCards;
