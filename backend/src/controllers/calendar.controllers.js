import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Calendar } from "../models/calendar.model.js";


const createCalendarEvent = asyncHandler(async (req, res) => {
    const { title, description, startDateTime, endDateTime, location, category } = req.body;

    if (!title || !startDateTime || !endDateTime || !category) {
        throw new ApiError(400, 'Title, Start DateTime, End DateTime, and Category are required');
    }

    if (new Date(startDateTime) >= new Date(endDateTime)) {
        throw new ApiError(400, 'End DateTime must be after Start DateTime');
    }

    const event = await Calendar.create({
        title,
        description,
        startDateTime,
        endDateTime,
        location,
        category,
        owner: req.user._id,
    })

    if (!event) {
        throw new ApiError(500, 'Failed to create calendar event');
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, event, 'Calendar event created successfully')
    );
})


export {
    createCalendarEvent,
}