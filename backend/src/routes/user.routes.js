import Router from 'express';
import { userSignup } from '../controllers/user.controllers.js';

const router = Router();


router.route('/signup').get(userSignup);

export default router;