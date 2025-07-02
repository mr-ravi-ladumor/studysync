import Router from 'express';
import {verifyAuthToken} from '../middlewares/auth.middleware.js';
import { 
    userRegister,
    userLogin,
    userLogout,
    updateUserData,
    changePassword,
    deleteUser
 } from '../controllers/user.controllers.js';

const router = Router();


router.route('/signup').post(userRegister);
router.route('/login').post(userLogin);
router.route('/logout').post(verifyAuthToken, userLogout);
router.route('/update').put(verifyAuthToken, updateUserData);
router.route('/changePassword').put(verifyAuthToken, changePassword);
router.route('/delete').delete(verifyAuthToken, deleteUser);

export default router;