import React, { useEffect, useState } from "react";
import UpdateTask from "./UpdateTask.jsx";
import DeleteTask from "./DeleteTask.jsx";

function formatDueText(dueDateStr) {
    if (!dueDateStr) return "No due date";
    const today = new Date();
    const due = new Date(dueDateStr);
    // normalize to dates only
    const tzOffset = due.getTimezoneOffset() * 60000;
    const dueDateOnly = new Date(due.getTime() - tzOffset);
    const todayOnly = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const diffMs = dueDateOnly - todayOnly;
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays > 1) return `in ${diffDays} days`;
    if (diffDays === -1) return "1 day ago";
    return `${Math.abs(diffDays)} days ago`;
}

function priorityColor(priority) {
    switch (priority) {
        case "high":
            return "bg-red-100 text-red-700";
        case "low":
            return "bg-blue-100 text-blue-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
}

function statusColor(status) {
    if (!status) return "bg-gray-100 text-gray-700";
    if (status === "completed") return "bg-green-100 text-green-700";
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
}

function TaskList({ tasks, setTasks }) {
    // console.log("tasklist");
    const [showUpdateTask, setShowUpdateTask] = useState(false);
    const [showDeleteTask, setShowDeleteTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [expanded, setExpanded] = useState([]);

    const toggleExpand = (id) => {
        setExpanded((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleComplete = async (task) => {
        const newStatus = task.status === "completed" ? "pending" : "completed";
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/tasks/updateTask/${
                    task._id
                }`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ status: newStatus }),
                }
            );
            const payload = await res.json();
            if (!res.ok)
                throw new Error(payload.message || "Failed to update status");
            setTasks((prev) =>
                prev.map((t) => (t._id === payload.data._id ? payload.data : t))
            );
        } catch (err) {
            console.error("Toggle complete error:", err);
            alert("Could not update task status. Try again.");
        }
    };

    useEffect(() => {
        // Fetch tasks from the backend when the component mounts
        const fetchTasks = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/tasks`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch tasks");
                }
                const allTasksData = await response.json();
                setTasks(allTasksData.data);
                // console.log("Tasks fetched successfully:", allTasksData.data);
            } catch (error) {
                // console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <>
            <h3 className="text-xl font-semibold mb-3">Your Tasks</h3>
            <p className="text-gray-600 mb-4">
                Here you can view and manage your tasks.
            </p>

            <div className="flex flex-col gap-4">
                {tasks.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">
                        No tasks yet. Click ‘Add New Task’ to get started!
                    </div>
                ) : (
                    tasks.map((task) => {
                        const dueText = formatDueText(task.dueDate);
                        // determine overdue: dueDate exists and is before today and status pending
                        const isOverdue =
                            task.dueDate &&
                            new Date(task.dueDate) < new Date() &&
                            task.status === "pending";
                        return (
                            <div
                                key={task._id}
                                className={`bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row md:justify-between gap-3 items-start md:items-center ${
                                    isOverdue ? "border-l-4 border-red-400" : ""
                                }`}
                            >
                                <div className="flex items-start gap-3 w-full">
                                    <button
                                        onClick={() => toggleComplete(task)}
                                        aria-label={
                                            task.status === "completed"
                                                ? "Mark as not completed"
                                                : "Mark as completed"
                                        }
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                            task.status === "completed"
                                                ? "bg-green-600 text-white"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {task.status === "completed" ? "✓" : ""}
                                    </button>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() =>
                                                    toggleExpand(task._id)
                                                }
                                                className="text-left"
                                            >
                                                <span className="font-medium text-gray-900">
                                                    {task.title}
                                                </span>
                                            </button>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${priorityColor(
                                                    task.priority
                                                )}`}
                                            >
                                                {task.priority || "medium"}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                           • Due {dueText}
                                        </p>

                                        {expanded.includes(task._id) &&
                                            task.description && (
                                                <p className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
                                                    {task.description}
                                                </p>
                                            )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 self-end md:self-center">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${statusColor(
                                            task.status
                                        )}`}
                                    >
                                        {task.status}
                                    </span>
                                    <button
                                        onClick={() => {
                                            setSelectedTask(task);
                                            setShowUpdateTask(true);
                                        }}
                                        className="text-blue-600 text-sm md:text-base"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedTask(task);
                                            setShowDeleteTask(true);
                                        }}
                                        className="text-red-600 text-sm md:text-base"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            {/* Update Task Modal */}
            {showUpdateTask && selectedTask && (
                <UpdateTask
                    taskData={selectedTask}
                    setTasks={setTasks}
                    setSelectedTask={setSelectedTask}
                    setShowUpdateTask={setShowUpdateTask}
                />
            )}
            {/* delete */}
            {showDeleteTask && (
                <DeleteTask
                    taskId={selectedTask?._id}
                    setTasks={setTasks}
                    setSelectedTask={setSelectedTask}
                    setShowDeleteTask={setShowDeleteTask}
                />
            )}
        </>
    );
}

export default TaskList;
