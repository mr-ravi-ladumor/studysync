import Router from 'express';
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/task.controllers.js';
import { verifyAuthToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').get(verifyAuthToken, getAllTasks);
router.route('/:taskId').get(verifyAuthToken, getTaskById);
router.route('/addTask').post(verifyAuthToken, createTask);
router.route('/updateTask/:taskId').put(verifyAuthToken, updateTask);
router.route('/deleteTask/:taskId').delete(verifyAuthToken, deleteTask);
export default router;