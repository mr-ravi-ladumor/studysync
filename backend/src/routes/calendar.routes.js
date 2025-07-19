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
router.route('/:calendarId').get(verifyAuthToken, getCalendarEventById);
router.route('/update/:calendarId').put(verifyAuthToken, updateCalendarEvent);
router.route('/delete/:calendarId').delete(verifyAuthToken, deleteCalendarEvent);

export default router;