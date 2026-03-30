import React, { useState } from "react";
import toast from "react-hot-toast";
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
                `${import.meta.env.VITE_BACKEND_URL}/api/tasks/updateTask/${taskData._id
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
            toast.success("Task updated successfully!");
        } catch (err) {
            toast.error(err.message || "Failed to update task. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-xl p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto custom-scrollbar">
                <h3 className="text-xl font-medium mb-2">Update Task</h3>
                <p className="text-gray-600 mb-4">
                    Edit the fields below and click Update.
                </p>

                <form
                    className="flex flex-col gap-3"
                    onSubmit={onSubmitUpdateTask}
                >
                    <div className="flex flex-col w-full mb-2">
                        <label className="form-label">Title</label>
                        <input
                            value={task.title}
                            onChange={(e) =>
                                setTask({ ...task, title: e.target.value })
                            }
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="flex flex-col w-full mb-2">
                        <label className="form-label">
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
                            className="form-input resize-none"
                        />
                    </div>

                    <div className="flex gap-4 mb-2">
                        <div className="flex-1">
                            <label className="form-label">
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
                                className="form-input"
                            />
                        </div>
                        <div className="w-36">
                            <label className="form-label">
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
                                className="form-input"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setShowUpdateTask(false);
                                setSelectedTask(null);
                            }}
                            className="btn-secondary px-5 py-2 text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary px-5 py-2 text-sm"
                        >
                            {isLoading ? (
                                <>
                                    <LoadingSpinner size="h-4 w-4" color="border-white" />
                                    Updating...
                                </>
                            ) : (
                                "Update Task"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateTask;
