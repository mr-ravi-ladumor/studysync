import React, { useState } from "react";
import LoadingSpinner from "../utility/LoadingSpinner.jsx";

function UpdateTask({
    taskData,
    setTasks,
    setShowUpdateTask,
    setSelectedTask,
}) {
    const [task, setTask] = useState({
        title: taskData.title || "",
        description: taskData.description || "",
        dueDate: taskData.dueDate ? taskData.dueDate.split("T")[0] : "",
        priority: taskData.priority || "medium",
    });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitUpdateTask = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/tasks/updateTask/${
                    taskData._id
                }`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        title: task.title,
                        description: task.description,
                        dueDate: task.dueDate || undefined,
                        priority: task.priority || undefined,
                    }),
                }
            );

            const payload = await res.json();
            if (!res.ok)
                throw new Error(payload.message || "Failed to update task");

            // update local list
            setTasks((prev) =>
                prev.map((t) => (t._id === payload.data._id ? payload.data : t))
            );

            // close modal
            setShowUpdateTask(false);
            setSelectedTask(null);
        } catch (err) {
            console.error("Update Task error:", err);
            alert("Failed to update task. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                <h3 className="text-xl font-medium mb-2">Update Task</h3>
                <p className="text-gray-600 mb-4">
                    Edit the fields below and click Update.
                </p>

                <form
                    className="flex flex-col gap-3"
                    onSubmit={onSubmitUpdateTask}
                >
                    <div>
                        <label className="block text-sm mb-1">Title</label>
                        <input
                            value={task.title}
                            onChange={(e) =>
                                setTask({ ...task, title: e.target.value })
                            }
                            required
                            className="w-full mb-3 px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">
                            Description
                        </label>
                        <textarea
                            rows={3}
                            value={task.description}
                            onChange={(e) =>
                                setTask({
                                    ...task,
                                    description: e.target.value,
                                })
                            }
                            className="w-full mb-4 px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm mb-1">
                                Due Date
                            </label>
                            <input
                                type="date"
                                value={task.dueDate}
                                onChange={(e) =>
                                    setTask({
                                        ...task,
                                        dueDate: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="w-36">
                            <label className="block text-sm mb-1">
                                Priority
                            </label>
                            <select
                                value={task.priority}
                                onChange={(e) =>
                                    setTask({
                                        ...task,
                                        priority: e.target.value,
                                    })
                                }
                                className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            type="button"
                            onClick={() => {
                                setShowUpdateTask(false);
                                setSelectedTask(null);
                            }}
                            className="px-4 py-2 rounded bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-green-600 text-white"
                        >
                            {isLoading ? (
                                <LoadingSpinner size={4} color="white" />
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateTask;
