import React from "react";
import {
    CalendarIcon,
    Pencil,
    Trash2
} from "lucide-react";

function EventList() {
    return (
        <div className="bg-white flex flex-col gap-4">
            <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>

            <div className="flex  items-start  gap-5 rounded-lg border-1 border-green-500 bg-green-50 px-4 pt-3 pb-1">
                <div className="mt-1">
                    <span className=""><CalendarIcon className="bg-green-500 text-white rounded-md p-1 h-8 w-8" /></span>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col justify-between w-full">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium text-black">Mid-Term Exam</h3>
                            <span className="text-green-600 text-[15px] bg-green-200 px-1 rounded-sm ">Today</span>
                        </div>
                            <span className="text-[15px] text-gray-800">Today, 10:00AM - 12:00 PM</span>
                    </div>
                    <div>
                        <p className="text-[15px] text-gray-800">Location: Science Building, Room 302</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <span className="flex gap-0 items-center">
                            <Pencil className="h-4 w-4 text-gray-700" />
                            <button className="text-gray-800 mx-2 text-[14px]  rounded">Edit</button>
                        </span>
                        <span className="flex items-center">
                            <Trash2 className="h-4 w-4 text-red-600"/>
                            <button className="text-red-600 mx-2 text-[14px]  rounded">Delete</button>
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex  items-start  gap-5 rounded-lg border-1 border-gray-300 bg-gray-50 px-4 pt-3 pb-1">
                <div className="mt-1">
                    <span className=""><CalendarIcon className="bg-purple-500 text-white rounded-md p-1 h-8 w-8" /></span>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col justify-between w-full">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium text-black">Mid-Term Exam</h3>
                            <span className="text-purple-600 text-[15px] bg-purple-200 px-1 rounded-sm ">Today</span>
                        </div>
                            <span className="text-[15px] text-gray-800">Today, 10:00AM - 12:00 PM</span>
                    </div>
                    <div>
                        <p className="text-[15px] text-gray-800">Location: Science Building, Room 302</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <span className="flex gap-0 items-center">
                            <Pencil className="h-4 w-4 text-gray-700" />
                            <button className="text-gray-800 mx-2 text-[14px]  rounded">Edit</button>
                        </span>
                        <span className="flex items-center">
                            <Trash2 className="h-4 w-4 text-red-600"/>
                            <button className="text-red-600 mx-2 text-[14px]  rounded">Delete</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventList;
