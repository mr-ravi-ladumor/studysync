import Router from 'express';
import {
    getAllTasks,
    getTaskById,
    createTask,
} from '../controllers/task.controllers.js';
import { verifyAuthToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/').get(verifyAuthToken, getAllTasks);
router.route('/:taskId').get(verifyAuthToken, getTaskById);
router.route('/create').post(verifyAuthToken, createTask)

export default router;