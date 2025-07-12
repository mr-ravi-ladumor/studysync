import React from "react";

function AddTask({ onSubmitAddTask, setShowAddTask }) {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 mx-auto w-full max-w-md ">
          <h3 className="text-xl font-medium mb-2">Add New Task</h3>
          <p className="text-gray-600 mb-6 border-b pb-5 border-gray-300">
            Please fill in the details of your new task below.
          </p>
          <form className="flex flex-col gap-2" onSubmit={onSubmitAddTask}>
            <div className="flex flex-col gap-1">
              <label htmlFor="" className="block ">
                Task Title
              </label>
              <input
                type="text"
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
                placeholder="Enter Task Description..."
                className="w-full mb-4 px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 "
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddTask(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300
                    transition-colors duration-300 "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 shadow-lg"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTask;
