import React from "react";

function DeleteTask({ taskId, setTasks, setSelectedTask, setShowDeleteTask }) {


  const onSubmitDeleteTask = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/deleteTask/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const deleteTask = await response.json();
      if (!response.ok) {
        throw new Error(deleteTask.message || "Failed to Update task");
      }
      

      setShowDeleteTask(false);
      setSelectedTask(null);
      setTasks((prevTasks) =>
        prevTasks.filter((task) =>
            task._id === deleteTask.data._id ? false : true
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
        <div className="bg-white rounded-xl p-8 mx-auto w-full max-w-md">
          <h3 className="text-red-500 text-xl font-medium mb-2">Delete Task</h3>
          <p className="text-red-500 mb-6 border-b pb-5 border-gray-300">
            Are you sure you want to delete this task? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setShowDeleteTask(false);
                setSelectedTask(null);
              }}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmitDeleteTask}              
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 shadow-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteTask;
