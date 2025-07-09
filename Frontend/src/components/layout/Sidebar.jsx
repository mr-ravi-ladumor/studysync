import React from "react";
import { NavLink } from "react-router-dom";
import {
    Plus,
    CalendarIcon,
    BookOpenIcon,
    LayoutDashboardIcon,
    CircleUser,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const sidebarData = [
  {
    name: "Dashboard",
    icon: <LayoutDashboardIcon className="h-5 w-5" />,
    path: "/dashboard",
  },
  {
    name: "Resources",
    icon: <BookOpenIcon className="h-5 w-5"/>,
    path: "/resources",
  },
  {
    name: "Calendar",
    icon: <CalendarIcon className="h-5 w-5"/>,
    path: "/calendar",
  },
];

function Sidebar() {
    const { user } = useAuth();
  return (
    <div className=" flex flex-col gap-7 h-screen bg-sidebar p-5">
      <div className="flex items-center gap-4 border-b-2 pb-8 border-gray-800">
        <Plus className="h-9 w-9 text-white bg-green-400 rounded-md " />
        <h2 className="text-2xl font-bold font-sans">StudySync</h2>
      </div>
      <main className="flex flex-col justify-between h-full mt-0">
        <div className="flex flex-col gap-3 h-full my-2">
          {sidebarData.map((item, index) => (
            <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              ` flex items-center gap-4  border-black-200 rounded-md p-3 ${
                isActive ? "text-white bg-gray-800 hover:bg-gray-950 " : "text-black-800 hover:bg-gray-100"
              }`
            }   
          >
            {item.icon}
            <span className="text-lg font-sans ">{item.name}</span>
          </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-3">
            <CircleUser className="text-gray-700 h-8 w-8" />
            <p className="text-black text-md font-normal">{user.firstname + " " + user.lastname}</p>
        </div>
      </main>
    </div>
  );
}

export default Sidebar;
