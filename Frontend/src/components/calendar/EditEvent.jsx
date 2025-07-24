import React, {useState} from 'react'

function EditEvent({eventData, setShowEditEvent , setSelectedEvent, setCalendarEvents}) {
    
    const [eventForm, setEventForm] = useState({
        eventTitle: eventData.title,
        eventStartDate: eventData.startDateTime.toLocaleDateString('sv'), 
        eventStartTime: eventData.startDateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}),
        eventEndDate: eventData.endDateTime.toLocaleDateString('sv'),
        eventEndTime: eventData.endDateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false}),
        eventCategory: eventData.category,
        eventLocation: eventData.location || '',
        eventDescription: eventData.description || ''
    });

    const [error, setError] = useState('');

    const onChangeInputHandler = (e) => {
        const {name, value} = e.target;
        setEventForm((prevForm) => {
            return {
                ...prevForm,
                [name]: value
            }
        })
    }

    const onSubmitEditEvent = async(e) => {
        e.preventDefault();

        let utcIsoStartString;
        let utcIsoEndString;

        function onValidateEventForm(){
            
            if (!eventForm.eventTitle || !eventForm.eventStartDate || !eventForm.eventStartTime ||
                !eventForm.eventEndDate || !eventForm.eventEndTime || !eventForm.eventCategory) {
                setError('Please fill in all required fields.');
                return false;
            }

            utcIsoStartString = new Date(`${eventForm.eventStartDate}T${eventForm.eventStartTime}`).toISOString();
            utcIsoEndString   = new Date(`${eventForm.eventEndDate}T${eventForm.eventEndTime}`).toISOString();

            if (new Date(utcIsoStartString) >= new Date(utcIsoEndString)) {
                setError('End time must be after start time.');
                return false;
            }

            if (new Date(utcIsoStartString) < new Date()) {
                setError('Start time cannot be in the past.');
                return false;
            }

            if (eventForm.eventDescription && eventForm.eventDescription.length > 500) {
                setError('Description cannot exceed 500 characters.');
                return false;
            }

            if (eventForm.eventLocation && eventForm.eventLocation.length > 100) {
                setError('Location cannot exceed 100 characters.');
                return false;
            }

            setError('');
            return true;
        }

        if (!onValidateEventForm()) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/calendar/update/${eventData._id}`,{
                method: 'PUT',
                credentials: "include",
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    title: eventForm.eventTitle,
                    startDateTime: utcIsoStartString,
                    endDateTime: utcIsoEndString,
                    category: eventForm.eventCategory,
                    location: eventForm.eventLocation,
                    description: eventForm.eventDescription
                })
            })

            const updatedEventData = await response.json();

            if (!response.ok) {
                console.log("Error updating event:", updatedEventData.data);
                setError(updatedEventData.message || 'Failed to updating event. Please try again.');
                return;
            }

            console.log("Event updated successfully:", updatedEventData.data);
            setError('');
            setSelectedEvent(null);
            
            setCalendarEvents((prevEvents) => 
                prevEvents.map((event) => {
                    return event._id === updatedEventData.data._id ? {
                        ...updatedEventData.data,
                        startDateTime: new Date(updatedEventData.data.startDateTime),
                        endDateTime: new Date(updatedEventData.data.endDateTime)
                    } : event;
                })
            );
            setShowEditEvent(false);

        } catch (error) {
            console.log("Network Error updating event:", error);
            setError('Failed to update event. Please try again later.');
        }
    }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 mx-auto w-full max-w-md ">
          <h3 className="text-xl  mb-2">Add Event</h3>
          
            <form className="flex flex-col gap-1">
            {error && (
              <span className="text-sm text-red-600 font-medium mb-2">
                {error}
              </span>
            )}
            {/* event Title */}
            <div className="flex flex-col gap-1">
              <label htmlFor="event-title" className="block ">
                Event Title
              </label>
              <input
                id="event-title"
                type="text"
                name="eventTitle"
                value={eventForm.eventTitle}
                onChange={onChangeInputHandler}
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
                    value={eventForm.eventStartDate}
                    onChange={onChangeInputHandler}
                    required
                    className="w-full mb-2 px-2 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="start-time ">
                    <label htmlFor="event-start-time" className="block ">
                    Start Time
                    </label>
                    <input
                    id="event-start-time"
                    type="time"
                    name="eventStartTime"
                    value={eventForm.eventStartTime}
                    onChange={onChangeInputHandler}
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
                    value={eventForm.eventEndDate}
                    onChange={onChangeInputHandler}
                    required
                    className="w-full mb-2 px-2 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="end-time ">
                    <label htmlFor="event-end-time" className="block ">
                    End Time
                    </label>
                    <input
                    id="event-end-time"
                    type="time"
                    name="eventEndTime"
                    value={eventForm.eventEndTime}
                    onChange={onChangeInputHandler}
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
                name="eventCategory"
                className="w-full mb-2 px-2 py-2 border overflow-y-scroll rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={eventForm.eventCategory}
                onChange={onChangeInputHandler}
                required
              >
                <option value="">Select a category</option>
                <option value="work">Work</option>
                <option value="study">Study</option>
                <option value="personal">Personal</option>
                <option value="meeting">Meeting</option>
                <option value="other">Other</option>
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
                value={eventForm.eventLocation}
                onChange={onChangeInputHandler}
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
                value={eventForm.eventDescription}
                onChange={onChangeInputHandler}
                name="eventDescription"
                placeholder="Enter event description..."
                className='w-full mb-2 px-2 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
                />
            </div>
            
            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowEditEvent(false)}
                 className="px-4 py-2 rounded  text-gray-700 hover:bg-gray-200
                        transition-colors duration-300 "
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onSubmitEditEvent}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors duration-300 shadow-lg"
              >
                Update event
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </>
  )
}

export default EditEvent
