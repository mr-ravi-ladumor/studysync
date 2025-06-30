import Router from 'express';
import verifyAuthToken from '../middlewares/auth.middleware.js';
import { 
    userRegister,
    userLogin,
    userLogout,
 } from '../controllers/user.controllers.js';

const router = Router();


router.route('/signup').post(userRegister);
router.route('/login').post(userLogin);
router.route('/logout').get(verifyAuthToken, userLogout);

export default router;