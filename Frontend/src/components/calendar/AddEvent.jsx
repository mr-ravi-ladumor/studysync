import React from 'react'

function AddEvent() {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 mx-auto w-full max-w-md ">
          <h3 className="text-xl  mb-2">Add Event</h3>
          <p className="text-gray-600 mb-4 border-b pb-2 border-gray-300">
            Please fill in the details of your new event below.
          </p>
            <form className="flex flex-col gap-1" encType="multipart/form-data">
            {/* {error && (
              <span className="text-sm text-red-600 font-medium mb-2">
                {error}
              </span>
            )} */}
            {/* event Title */}
            <div className="flex flex-col gap-1">
              <label htmlFor="event-title" className="block ">
                Event Title
              </label>
              <input
                id="event-title"
                type="text"
                name="eventTitle"
                
                placeholder="Enter event Title..."
                required
                className="w-full mb-0 px-2 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* event start date and time */}
            <div className="flex justify-between ">
                <div className="startDate ">
                    <label htmlFor="event-start-date" className="block ">
                    Start Date
                    </label>
                    <input
                    id="event-start-date"
                    type="date"
                    name="eventStartDate"
                    required
                    className="w-full mb-2 px-2 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="start-time ">
                    <label htmlFor="event-start-time" className="block ">
                    Start Date
                    </label>
                    <input
                    id="event-start-time"
                    type="time"
                    name="eventStartTime"
                    required
                    className="w-full mb-2 px-2 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                 </div>        
            </div>
            {/* event end date and time */}
            <div className="flex justify-between ">
                <div className="endDate ">
                    <label htmlFor="event-end-date" className="block ">
                    End Date
                    </label>
                    <input
                    id="event-end-date"
                    type="date"
                    name="eventEndDate"
                    required
                    className="w-full mb-2 px-2 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="end-time ">
                    <label htmlFor="event-end-time" className="block ">
                    Start Date
                    </label>
                    <input
                    id="event-end-time"
                    type="time"
                    name="eventEndTime"
                    required
                    className="w-full mb-2 px-2 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                 </div>        
            </div>
            {/* Category */}
            <div className="flex flex-col gap-1">
              <label htmlFor="event-category" className="block ">
                Category
              </label>
              <select
                id="event-category"
                className="w-full mb-2 px-2 py-2 border overflow-y-scroll rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                
                required
              >
                <option value="">Select Category</option>
                <option value="">Study</option>
                <option value="">Assignment</option>
                <option value="">Office</option>
                <option value="">Classroom</option>
              </select>
              
            </div>
                      
            {/* Location */}
            <div className="flex flex-col gap-1">
              <label htmlFor="event-location" className="block ">
                Location
              </label>
                <input
                id="event-location"
                type="text"
                name="eventLocation"
                placeholder="Enter event location..."
                className='w-full mb-2 px-2 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                />
            </div>
            {/* Description */}
            <div className="flex flex-col gap-1">
              <label htmlFor="event-description" className="block ">
                Description <span className='text-gray-600'>(optional)</span>
              </label>
                <textarea
                id="event-description"
                type="text"
                rows={3}
                name="eventDescription"
                placeholder="Enter event description..."
                className='w-full mb-2 px-2 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                />
            </div>
            
           
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded  text-gray-700 hover:bg-gray-200transition-colors duration-300 "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 shadow-lg"
              >
                Add event
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </>
  )
}

export default AddEvent
