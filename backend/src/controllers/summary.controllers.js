import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Task } from "../models/task.model.js";
import Calendar from "../models/calendar.model.js";
import Resource from "../models/resource.model.js";

// General summary for dashboard: tasks, events, resources
const getGeneralSummary = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const now = new Date();

    const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
    const weekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const [
        pendingCount,
        completedCount,
        dueTodayCount,
        upcomingEventsCount,
        resourcesCount,
        courses,
    ] = await Promise.all([
        Task.countDocuments({ owner: userId, status: "pending" }),
        Task.countDocuments({ owner: userId, status: "completed" }),
        Task.countDocuments({
            owner: userId,
            status: "pending",
            dueDate: { $lt: todayEnd },
        }),
        Calendar.countDocuments({
            owner: userId,
            startDateTime: { $gte: now, $lte: weekLater },
        }),
        Resource.countDocuments({ owner: userId }),

        Resource.distinct("subject", { owner: userId }),
    ]);

    res.status(200).json(
        new ApiResponse(
            200,
            {
                pending: pendingCount,
                completed: completedCount,
                dueToday: dueTodayCount,
                upcomingEvents: upcomingEventsCount,
                resourcesCount,
                coursesCount: courses.length,
            },
            "Summary retrieved successfully"
        )
    );
});

export { getGeneralSummary };
