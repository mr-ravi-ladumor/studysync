import React from "react";
import { FileText, CalendarIcon } from "lucide-react";

const filterChips = [
  { label: "All Resources", value: "all" },
  { label: "Documents", value: "documents" },
  { label: "Images", value: "images" },
  { label: "Links", value: "links" },
  { label: "Notes", value: "notes" },
  { label: "Others", value: "others" },
];

const resources = [
    {
        id: 1,
        title: "OOPs Notes",
        type: "PDF",
        size: "2.4 MB",
        dateAdded: "May 12, 2023",
        category: ["Computer", "oops"],
    },
    {
        id: 2,
        title: "JavaScript Guide",
        type: "PDF",
        size: "1.2 MB",
        dateAdded: "June 5, 2023",
        category: ["Programming", "JavaScript"],
    },
    {
        id: 3,
        title: "React Documentation",
        type: "Link",
        size: "N/A",
        dateAdded: "July 20, 2023",
        category: ["Web Development", "React"],
    },
    {
        id: 4,
        title: "Machine Learning Basics",
        type: "PDF",
        size: "3.5 MB",
        dateAdded: "August 15, 2023",
        category: ["AI", "Machine Learning"],
    },
    {
        id: 5,
        title: "CSS Tricks",
        type: "Link",
        size: "N/A",
        dateAdded: "September 10, 2023",
        category: ["Web Development", "CSS"],
    }
]

function Resources() {
  return (
    <div className="h-screen flex flex-col gap-5 ">
      <div className="header flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-medium">Resources</h3>
          <p className="text-gray-600">
            Access and organize all your study materials and documents in one
            place.
          </p>
        </div>
        <div className="">
          <button className=" bg-green-500 text-white px-4 py-1 rounded-lg flex items-center gap-2 justify-cente hover:bg-green-600 transition-colors duration-300 shadow-lg">
            <span className="text-2xl mb-1">+</span> Add Resource
          </button>
        </div>
      </div>
      <div className="filter-chips">
        <div className="ml-1 mt-3 chip flex items-center gap-5 ">
          {filterChips.map((chip) => (
            <span
              key={chip.value}
              className="text-[15px] text-gray-800 bg-gray-200 rounded-2xl py-1 px-[10px] text-center hover:bg-gray-300 focus:bg-green-500 transition-bg duration-200"
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
        resources.map((res) => (
            <div className="card bg-white rounded-xl px-3 py-3">
                <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-600 rounded-lg p-2">
                        <FileText className="h-5 w-5" />
                    </span>
                    <div>
                    <h3 className="font-bold text-lg">{res.title}</h3>
                    <p className="text-gray-500 text-sm">{res.type} • {res.size}</p>
                    </div>
                </div>
                <div className="h-px w-full bg-gray-200 my-4"></div>
                <div className="flex items-center justify-between">
                    <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-gray-400 text-sm">
                        <CalendarIcon className="h-3 w-3"/></span>
                        <span className="text-gray-500 text-sm">
                        {res.dateAdded}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="bg-blue-100 text-blue-600 rounded px-2 py-0.5 text-xs">
                        {res.category[0]}</span>
                        <span className="bg-gray-100 text-gray-600 rounded px-2 py-0.5 text-xs">
                        {res.category[1]}</span>
                    </div>
                    </div>
                    {/* Download action */}
                    <a
                    href="#"
                    className="text-green-500 font-medium text-sm hover:underline"
                    >
                    Download
                    </a>
                </div>
            </div>)
        )}
      </div>
      <div className="pagination"></div>
    </div>
  );
}

export default Resources;
