import Router from 'express';
import { verifyAuthToken } from '../middlewares/auth.middleware.js';
import {
    createCalendarEvent,
    getAllCalendarEvents,
    getCalendarEventById,
    updateCalendarEvent,
    deleteCalendarEvent,
} from '../controllers/calendar.controllers.js';

const router = Router();


router.route('/').post(verifyAuthToken, createCalendarEvent);
router.route('/').get(verifyAuthToken,  getAllCalendarEvents);
router.route('/:eventId').get(verifyAuthToken, getCalendarEventById);
router.route('/update/:eventId').put(verifyAuthToken, updateCalendarEvent);
router.route('/delete/:eventId').delete(verifyAuthToken, deleteCalendarEvent);

export default router;