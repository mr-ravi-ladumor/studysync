import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../utility/LoadingSpinner.jsx";

function AddTask({ setTasks, setShowAddTask }) {
    const [task, setTask] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
    });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitAddTask = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/tasks/addTask`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        title: task.title,
                        description: task.description,
                        dueDate: task.dueDate || undefined,
                        priority: task.priority || undefined,
                    }),
                }
            );

            const addedTask = await response.json();
            if (!response.ok) {
                throw new Error(addedTask.message || "Failed to add task");
            }

            setTasks((prevTasks) => [...prevTasks, addedTask.data]);

            setTask({
                title: "",
                description: "",
                dueDate: "",
                priority: "medium",
            });
            setShowAddTask(false);
            toast.success("Task added successfully!");
        } catch (err) {
            toast.error(err.message || "Failed to add task. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 sm:p-6">
                <div className="bg-white rounded-xl p-6 mx-auto w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
                    <h3 className="text-xl font-medium mb-2">Add New Task</h3>
                    <p className="text-gray-600 mb-6 border-b pb-5 border-gray-300">
                        Please fill in the details of your new task below.
                    </p>
                    <form
                        className="flex flex-col gap-2"
                        onSubmit={onSubmitAddTask}
                    >
                        <div className="flex flex-col w-full mb-2">
                            <label htmlFor="" className="form-label">
                                Task Title
                            </label>
                            <input
                                type="text"
                                name="taskTitle"
                                value={task.title}
                                onChange={(e) =>
                                    setTask({ ...task, title: e.target.value })
                                }
                                placeholder="Enter Task Title..."
                                required
                                className="form-input"
                            />
                        </div>
                        <div className="flex flex-col w-full mb-2">
                            <label htmlFor="" className="form-label">
                                Task Description
                            </label>
                            <textarea
                                name="taskDescription"
                                rows="4"
                                value={task.description}
                                onChange={(e) =>
                                    setTask({
                                        ...task,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Enter Task Description..."
                                className="form-input resize-none"
                            />
                        </div>
                        <div className="flex gap-4 mb-4">
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
                            <div className="w-40">
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
                                onClick={() => setShowAddTask(false)}
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
                                        <LoadingSpinner
                                            size="h-4 w-4"
                                            color="border-white"
                                        />
                                        Adding...
                                    </>
                                ) : (
                                    "Add Task"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddTask;
