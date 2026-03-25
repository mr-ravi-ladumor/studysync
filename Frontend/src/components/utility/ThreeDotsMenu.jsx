import React, { useState, useEffect, useRef } from "react";
import { EllipsisVertical, Eye, FileEdit, Trash2 } from "lucide-react";

function ThreeDotsMenu({ onViewDetails, onEdit, onDelete }) {
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
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200"
        aria-label="Open menu"
      >
        <EllipsisVertical className="h-5 w-5 text-gray-600 hover:text-blue-600" />
      </button>

      {open && (
        <div 
          className="absolute right-0 mt-2 w-32 origin-top-right rounded-xl z-50 
                     bg-white/90 backdrop-blur-md border border-gray-100 
                     shadow-2xl shadow-blue-900/10 py-1.5 animate-in fade-in zoom-in duration-200"
        >
          <ul className="flex flex-col gap-0.5 px-1">
            <li
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 
                         hover:bg-blue-50 hover:text-blue-700 cursor-pointer rounded-lg 
                         transition-all duration-200"
              onClick={() => {
                onViewDetails();
                setOpen(false);
              }}
            >
              <Eye size={16} className="opacity-70" />
              <span>Details</span>
            </li>
            <li
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 
                         hover:bg-blue-50 hover:text-blue-700 cursor-pointer rounded-lg 
                         transition-all duration-200"
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
            >
              <FileEdit size={16} className="opacity-70" />
              <span>Edit</span>
            </li>
            <li
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 
                         hover:bg-red-50 cursor-pointer rounded-lg 
                         transition-all duration-200"
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
            >
              <Trash2 size={16} className="opacity-70" />
              <span>Delete</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ThreeDotsMenu;
