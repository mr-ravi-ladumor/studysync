import React, { useEffect, useState } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);

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
        console.log("Tasks fetched successfully:", allTasksData.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
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
        {/* Example static tasks, replace with your dynamic data */}
        {tasks.map((task) => (
          <div key={task._id} className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
            <div>
              <span className="font-medium text-gray-900">
                {task.title}
              </span>
              <p className="text-sm text-gray-500">Due: Tomorrow</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                {task.status}
              </span>
              <button className="text-blue-600 hover:underline text-sm">
                Edit
              </button>
              <button className="text-red-600 hover:underline text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {/* <div className="text-gray-500 text-center py-8">No tasks yet. Click ‘Add New Task’ to get started!</div> */}
    </>
  );
}

export default TaskList;
