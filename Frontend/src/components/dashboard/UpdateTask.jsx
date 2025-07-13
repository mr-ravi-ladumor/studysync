import React, { useState } from "react";

function UpdateTask({
  taskData,
  setTasks,
  setShowUpdateTask,
  setSelectedTask,
}) {

  const [task, setTask] = useState({
    title: taskData.title,
    description: taskData.description,
  });
  const onSubmitUpdateTask = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/updateTask/${
          taskData._id
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(task),
        }
      );

      const updatedTask = await response.json();
      if (!response.ok) {
        throw new Error(updatedTask.message || "Failed to Update task");
      }
      // console.log("Task Updates successfully:", updatedTask.data);
      setTask({
        title: "",
        description: "",
      });

      setShowUpdateTask(false);
      setSelectedTask(null);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask.data._id ? updatedTask.data : task
        )
      );

      alert("Task Updated successfully!");
    } catch (error) {
      console.error("Error Updating task:", error);
      alert("Failed to Update task. Please try again.");
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 mx-auto w-full max-w-md ">
          <h3 className="text-xl font-medium mb-2">Update Task</h3>
          <p className="text-gray-600 mb-6 border-b pb-5 border-gray-300">
            Please Update the details of your task below.
          </p>
          <form className="flex flex-col gap-2" onSubmit={onSubmitUpdateTask}>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="block ">
                Task Title
              </label>
              <input
                type="text"
                name="taskTitle"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                placeholder="Enter Task Title..."
                required
                className="w-full mb-3 px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="">
                Task Description
              </label>
              <textarea
                name="taskDescription"
                rows="4"
                value={task.description}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
                placeholder="Enter Task Description..."
                className="w-full mb-4 px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 "
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowUpdateTask(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300
                          transition-colors duration-300 "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 shadow-lg"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateTask;
