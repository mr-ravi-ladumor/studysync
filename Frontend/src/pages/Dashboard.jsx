import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AddTask from "../components/dashboard/AddTask.jsx";
import StatusCards from "../components/dashboard/StatusCards.jsx";
import TaskList from "../components/dashboard/TaskList.jsx";

function Dashboard() {
  const { user } = useAuth();
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  if (!user) {
    return <p>Please log in to access the dashboard.</p>;
  }

  return (
    <div className="h-screen flex flex-col gap-5 ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-medium">Dashboard</h3>
          <p className="text-gray-600 text-medium">
            Welcome back, {user.firstname}! Here's an overview of your academic
            progress.
          </p>
        </div>
        <button
          onClick={() => setShowAddTask(!showAddTask)}
          className=" bg-green-500 text-white px-4 py-1 rounded-lg flex items-center gap-2 justify-cente hover:bg-green-600 transition-colors duration-300 shadow-lg"
        >
          <span className="text-2xl mb-1">+</span> Add New Task
        </button>
        {showAddTask && (
          <AddTask
            setTasks={setTasks}
            setShowAddTask={setShowAddTask}
          />
        )}
      </div>
      <main>
        <section className="cards flex  items-center gap-3">
            <StatusCards />
        </section>
        <div className="task-section mt-8">
            <TaskList tasks={tasks} setTasks={setTasks}/>
        </div>
        
      </main>
    </div>
  );
}

export default Dashboard;
