import React, {useState} from 'react'

function AddEvent({ setShowAddEvent }) {
    const [eventForm, setEventForm] = useState({
        eventTitle: '',
        eventStartDate: '',
        eventStartTime: '',
        eventEndDate: '',
        eventEndTime: '',
        eventCategory: '',
        eventLocation: '',
        eventDescription: ''
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

    const onSubmitAddEvent = async(e) => {
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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/calendar`,{
                method: 'POST',
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

            const eventData = await response.json();

            if (!response.ok) {
                // console.log("Error adding event:", eventData);
                setError(eventData.message || 'Failed to add event. Please try again.');
            }

            // console.log("Event added successfully:", eventData);
            setError('');
            setShowAddEvent(false);
        } catch (error) {
            // console.log("Network Error adding event:", error);
            setError('Failed to add event. Please try again later.');
        }
    }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-xl p-6 mx-auto w-full max-w-md max-h-[90vh] overflow-y-auto custom-scrollbar">
          <h3 className="text-xl  mb-2">Add Event</h3>
          <p className="text-gray-600 mb-4 border-b pb-2 border-gray-300">
            Please fill in the details of your new event below.
          </p>
            <form className="flex flex-col gap-1">
            {error && (
              <span className="text-sm text-red-600 font-medium mb-2">
                {error}
              </span>
            )}
            {/* event Title */}
            <div className="flex flex-col w-full mb-2">
              <label htmlFor="event-title" className="form-label">
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
                className="form-input"
              />
            </div>
            {/* event start date and time */}
            <div className="flex gap-4 mb-2">
                <div className="flex-1 w-1/2">
                    <label htmlFor="event-start-date" className="form-label">
                    Start Date
                    </label>
                    <input
                    id="event-start-date"
                    type="date"
                    name="eventStartDate"
                    value={eventForm.eventStartDate}
                    onChange={onChangeInputHandler}
                    required
                    className="form-input"
                    />
                </div>
                <div className="flex-1 w-1/2">
                    <label htmlFor="event-start-time" className="form-label">
                    Start Time
                    </label>
                    <input
                    id="event-start-time"
                    type="time"
                    name="eventStartTime"
                    value={eventForm.eventStartTime}
                    onChange={onChangeInputHandler}
                    required
                    className="form-input"
                    />
                 </div>        
            </div>
            {/* event end date and time */}
            <div className="flex gap-4 mb-2">
                <div className="flex-1 w-1/2">
                    <label htmlFor="event-end-date" className="form-label">
                    End Date
                    </label>
                    <input
                    id="event-end-date"
                    type="date"
                    name="eventEndDate"
                    value={eventForm.eventEndDate}
                    onChange={onChangeInputHandler}
                    required
                    className="form-input"
                    />
                </div>
                <div className="flex-1 w-1/2">
                    <label htmlFor="event-end-time" className="form-label">
                    End Time
                    </label>
                    <input
                    id="event-end-time"
                    type="time"
                    name="eventEndTime"
                    value={eventForm.eventEndTime}
                    onChange={onChangeInputHandler}
                    required
                    className="form-input"
                    />
                 </div>        
            </div>
            {/* Category */}
            <div className="flex flex-col w-full mb-2">
              <label htmlFor="event-category" className="form-label">
                Category
              </label>
              <select
                id="event-category"
                name="eventCategory"
                className="form-input overflow-y-scroll"
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
            <div className="flex flex-col w-full mb-2">
              <label htmlFor="event-location" className="form-label">
                Location
              </label>
                <input
                id="event-location"
                type="text"
                name="eventLocation"
                value={eventForm.eventLocation}
                onChange={onChangeInputHandler}
                placeholder="Enter event location..."
                className="form-input"
                />
            </div>
            {/* Description */}
            <div className="flex flex-col w-full mb-2">
              <label htmlFor="event-description" className="form-label">
                Description <span className="lowercase text-gray-400 opacity-70 ml-1 font-normal">(optional)</span>
              </label>
                <textarea
                id="event-description"
                type="text"
                rows={3}
                value={eventForm.eventDescription}
                onChange={onChangeInputHandler}
                name="eventDescription"
                placeholder="Enter event description..."
                className="form-input resize-none"
                />
            </div>
            
            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowAddEvent(false)}
                 className="btn-secondary px-5 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={onSubmitAddEvent}
                className="btn-primary px-5 py-2 text-sm"
              >
                Add Event
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </>
  )
}

export default AddEvent
