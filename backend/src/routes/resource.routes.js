import Router from 'express';
import { verifyAuthToken } from '../middlewares/auth.middleware.js';
import uploadCloud from '../middlewares/uploadCloudinary.middleware.js';
import { 
    uploadResource,
    getAllResources
 } from '../controllers/resource.controllers.js';


const router = Router();

router.route('/').post(verifyAuthToken, uploadCloud.single('resource'), uploadResource)
router.route('/').get(verifyAuthToken, getAllResources)

export default router;