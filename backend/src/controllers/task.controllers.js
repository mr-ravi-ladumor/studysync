import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";

// Get All Tasks
const getAllTasks = asyncHandler(async (req, res) => {
    // prefer tasks with soonest dueDate first, fall back to createdAt
    const tasks = await Task.find({ owner: req.user._id }).sort({
        dueDate: 1,
        createdAt: -1,
    });

    if (!tasks) {
        throw new ApiError(404, "No tasks found");
    }

    res.status(200).json(
        new ApiResponse(200, tasks, "All Tasks retrieved successfully")
    );
});

// Get tasks summary for dashboard
const getTasksSummary = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const now = new Date();

    const [pendingCount, completedCount, overdueCount] = await Promise.all([
        Task.countDocuments({ owner: userId, status: "pending" }),
        Task.countDocuments({ owner: userId, status: "completed" }),
        Task.countDocuments({
            owner: userId,
            status: "pending",
            dueDate: { $lt: now },
        }),
    ]);

    res.status(200).json(
        new ApiResponse(
            200,
            {
                pending: pendingCount,
                completed: completedCount,
                overdue: overdueCount,
            },
            "Tasks summary retrieved successfully"
        )
    );
});

// Get Task by ID
const getTaskById = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    if (!taskId) {
        throw new ApiError(400, "Task ID is required");
    }

    const userId = req.user._id;

    const task = await Task.findOne({
        _id: taskId,
        owner: userId,
    });

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    res.status(200).json(
        new ApiResponse(200, task, "Task retrieved successfully")
    );
});

// Create Task
const createTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, priority } = req.body;

    if (!title) {
        throw new ApiError(400, "Task Title is required");
    }

    if (!req.user) {
        throw new ApiError(401, "Unauthorized access to create Task");
    }

    const payload = {
        title,
        description,
        owner: req.user._id,
    };

    if (dueDate !== undefined) payload.dueDate = dueDate;
    if (priority !== undefined) payload.priority = priority;

    const newTask = await Task.create(payload);

    res.status(201).json(
        new ApiResponse(201, newTask, "Task created successfully")
    );
});

// Update Task
const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    const { title, description, status, dueDate, priority } = req.body;

    if (!taskId) {
        throw new ApiError(400, "Task ID is required");
    }
    const userId = req.user._id;

    const updateObj = {};
    if (title !== undefined) updateObj.title = title;
    if (description !== undefined) updateObj.description = description;
    if (status !== undefined) updateObj.status = status;
    if (dueDate !== undefined) updateObj.dueDate = dueDate;
    if (priority !== undefined) updateObj.priority = priority;

    if (Object.keys(updateObj).length === 0) {
        throw new ApiError(400, "No valid fields provided to update");
    }

    const task = await Task.findOneAndUpdate(
        { _id: taskId, owner: userId },
        updateObj,
        { new: true, runValidators: true }
    );

    if (!task) {
        throw new ApiError(
            404,
            "Task not found or you do not have permission to update it"
        );
    }
    res.status(200).json(
        new ApiResponse(200, task, "Task updated successfully")
    );
});

// Delete Task
const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    if (!taskId) {
        throw new ApiError(400, "Task ID is required");
    }

    const userId = req.user._id;
    const task = await Task.findOneAndDelete({ _id: taskId, owner: userId });
    if (!task) {
        throw new ApiError(
            404,
            "Task not found or you do not have permission to delete it"
        );
    }
    res.status(200).json(
        new ApiResponse(200, task, "Task deleted successfully")
    );
});

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
