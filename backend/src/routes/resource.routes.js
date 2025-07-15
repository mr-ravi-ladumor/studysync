import Router from 'express';
import { verifyAuthToken } from '../middlewares/auth.middleware.js';
import uploadCloud from '../middlewares/uploadCloudinary.middleware.js';

import { 
    uploadResource,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource
 } from '../controllers/resource.controllers.js';


const router = Router();

router.route('/').get(verifyAuthToken, getAllResources)
router.route('/upload').post(verifyAuthToken, uploadCloud.single('file'), uploadResource)
router.route('/:resourceId').get(verifyAuthToken, getResourceById)
router.route('/update/:resourceId').put(verifyAuthToken, uploadCloud.single('file'), updateResource)
router.route('/delete/:resourceId').put(verifyAuthToken, uploadCloud.single('file'), deleteResource)


export default router;