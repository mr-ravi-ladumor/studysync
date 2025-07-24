import React from "react";

function DeleteEvent({ eventId, setCalendarEvents, setSelectedEvent, setShowDeleteEvent }) {

  const onSubmitDeleteEvent = async (e) => {
    e.preventDefault();
    console.log("Deleting event with ID:", eventId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/calendar/delete/${eventId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const deletedEvent = await response.json();
      if (!response.ok) {
        throw new Error(deletedEvent.message || "Failed to Deleted Event");
      }
      

      setShowDeleteEvent(false);
      setSelectedEvent(null);
      setCalendarEvents((prevEvents) =>
        prevEvents.filter((Event) =>
            Event._id === deletedEvent.data._id ? false : true
        )
    );

      alert("Event Deleted successfully!");
    } catch (error) {
      console.error("Error Deleted Event:", error);
      alert("Failed to Deleted Event. Please try again.");
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 mx-auto w-full max-w-md">
          <h3 className="text-red-500 text-xl font-medium mb-2">Delete Event</h3>
          <p className="text-red-500 mb-6 border-b pb-5 border-gray-300">
            Are you sure you want to delete this Event? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setShowDeleteEvent(false);
                setSelectedEvent(null);
              }}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmitDeleteEvent}              
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 shadow-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteEvent;
