import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {Task} from '../models/task.model.js';


// Get All Tasks
const getAllTasks = asyncHandler(async(req,res) => {
    
    const tasks = await Task.find({owner: req.user._id}).sort({createdAt: -1});

    if (!tasks || tasks.length === 0){
        throw new ApiError(404, 'No tasks found');
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, tasks, 'All Tasks retrieved successfully')
    )
})

// Get Task by ID
const getTaskById = asyncHandler(async(req, res) => {
    const taskId = req.params.taskId;
    if (!taskId) {
        throw new ApiError(400, 'Task ID is required');
    }

    const userId = req.user._id;

    const task = await Task.findOne({
        _id: taskId,
        owner: userId
    });

    if (!task) {
        throw new ApiError(404, 'Task not found');
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, task, 'Task retrieved successfully')
    );
});

// Create Task 
const createTask = asyncHandler(async (req,res) => {
    const {title, description} = req.body;

    if (!title) {
        throw new ApiError(400, 'Task Title is required');
    }

    if (!req.user) {
        throw new ApiError(401, 'Unauthorized access to create Task');
    }

    const newTask = await Task.create({
        title,
        description,
        owner: req.user._id
    });

    res
    .status(201)
    .json(
        new ApiResponse(201, newTask, 'Task created successfully')
    );
})

// Update Task
const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    const {title, description, status} = req.body;

    if (!taskId) {
        throw new ApiError(400, 'Task ID is required');
    }
    const userId = req.user._id;
    const task = await Task.findOneAndUpdate(
        {_id: taskId, owner: userId},
        {title, description, status},
        {new: true, runValidators: true}
    );

    if (!task) {
        throw new ApiError(404, 'Task not found or you do not have permission to update it');
    }
    res
    .status(200)
    .json(
        new ApiResponse(200, task, 'Task updated successfully')
    );
});

// Delete Task
const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    if (!taskId) {
        throw new ApiError(400, 'Task ID is required');
    }

    const userId = req.user._id;
    const task = await Task.findOneAndDelete(
        {_id: taskId, owner: userId}
    );
    if (!task) {
        throw new ApiError(404, 'Task not found or you do not have permission to delete it');
    }
    res
    .status(200)
    .json(
        new ApiResponse(200, task, 'Task deleted successfully')
    );
});

export {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
}