import React, { useState, useEffect, useRef } from "react";
import { EllipsisVertical } from "lucide-react";


function ThreeDotsMenu({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setOpen(false);
    };
  }, []);
  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded-full hover:bg-gray-100 transition"
        aria-label="Open menu"
      >
        <EllipsisVertical className="h-5 w-5 text-gray-700" />
      </button>{" "}
      {open && (
        <div className="absolute right-0 -mt-1 w-18 rounded-lg z-50 bg-black/85  py-1 border border-gray-500">
          <ul className="text-white text-[12px]">
            <li
              className="px-1 hover:bg-gray-400 cursor-pointer rounded"
              onClick={() => {
                onView();
                setOpen(false);
              }}
            >
              View
            </li>
            <li
              className="px-1 hover:bg-gray-400 cursor-pointer rounded"
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
            >
              Edit
            </li>
            <li
              className="px-1 hover:bg-red-100 text-red-600 cursor-pointer rounded"
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ThreeDotsMenu;
