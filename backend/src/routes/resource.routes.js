import Router from 'express';
import { verifyAuthToken } from '../middlewares/auth.middleware.js';
import uploadCloud from '../middlewares/uploadCloudinary.middleware.js';

import { 
    uploadResource,
    getAllResources,
    getResourceById,
    updateResource
 } from '../controllers/resource.controllers.js';


const router = Router();

router.route('/').post(verifyAuthToken, uploadCloud.single('file'), uploadResource)
router.route('/').get(verifyAuthToken, getAllResources)
router.route('/:resourceId').get(verifyAuthToken, getResourceById)
router.route('/:resourceId').put(verifyAuthToken, uploadCloud.single('file'), updateResource)

export default router;