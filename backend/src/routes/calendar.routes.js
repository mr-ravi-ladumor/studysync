import Router from 'express';
import { verifyAuthToken } from '../middlewares/auth.middleware.js';
import {
    createCalendarEvent,
} from '../controllers/calendar.controllers.js';

const router = Router();


router.route('/').post(verifyAuthToken, createCalendarEvent);