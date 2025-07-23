import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Calendar from "../models/calendar.model.js";

const createCalendarEvent = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        startDateTime,
        endDateTime,
        location,
        category,
    } = req.body;

    if (!title || !startDateTime || !endDateTime || !category) {
        throw new ApiError(
            400,
            "Title, Start DateTime, End DateTime, and Category are required"
        );
    }

    if (new Date(startDateTime) >= new Date(endDateTime)) {
        throw new ApiError(400, "End DateTime must be after Start DateTime");
    }

    const event = await Calendar.create({
        title,
        description,
        startDateTime,
        endDateTime,
        location,
        category,
        owner: req.user._id,
    });

    if (!event) {
        throw new ApiError(500, "Failed to create calendar event");
    }

    res.status(200).json(
        new ApiResponse(200, event, "Calendar event created successfully")
    );
});

const getAllCalendarEvents = asyncHandler(async (req, res) => {
    const events = await Calendar.find({
        owner: req.user._id,
    });

    if (!events) {
        throw new ApiError(404, "No calendar events found");
    }

    res.status(200).json(
        new ApiResponse(200, events, "Calendar events retrieved successfully")
    );
});

const getCalendarEventById = asyncHandler(async (req, res) => {
    const { calendarId } = req.params;
    const event = await Calendar.findById({
        _id: calendarId,
        owner: req.user._id,
    });

    if (!event) {
        throw new ApiError(404, "Calendar event not found");
    }

    res.status(200).json(
        new ApiResponse(200, event, "Calendar event retrieved successfully")
    );
});

const updateCalendarEvent = asyncHandler(async (req, res) => {
    const { calendarId } = req.params;
    if (!calendarId) {
        throw new ApiError(400, "Calendar Event Id is required");
    }
    const {
        title,
        description,
        startDateTime,
        endDateTime,
        location,
        category,
    } = req.body;

    if (!title || !startDateTime || !endDateTime || category) {
        throw new ApiError(
            404,
            "Title, Start DateTime, End DateTime, and Category are required"
        );
    }

    if (new Date(startDateTime) >= new Date(endDateTime)) {
        throw new ApiError(400, "End DateTime must be after Start DateTime");
    }

    const updatedEvent = await findOneAndUpdate(
        { _id: calendarId, owner: req.user._id },
        { title, description, startDateTime, endDateTime, location, category },
        { new: true }
    );

    if (!updatedEvent) {
        throw new ApiError(
            404,
            "Event not found or you do not have permission to update it"
        );
    }

    res.status(200).json(
        new ApiResponse(
            200,
            updatedEvent,
            "Calendar Event updated successfully"
        )
    );
});

const deleteCalendarEvent = asyncHandler(async (req, res) => {
    const { calendarId } = req.params;
    if (!calendarId) {
        throw new ApiError(400, "Calendar Event Id is required");
    }

    const deletedEvent = await findOneAndDelete({
        _id: calendarId,
        owner: req.user._id,
    });

    if (!deletedEvent) {
        throw new ApiError(
            404,
            "Event not found or you do not have permission to delete it"
        );
    }

    res.status(200).json(
        new ApiResponse(
            200,
            deletedEvent,
            "Calendar Event deleted successfully"
        )
    );
});

export {
    createCalendarEvent,
    getAllCalendarEvents,
    getCalendarEventById,
    updateCalendarEvent,
    deleteCalendarEvent,
};
