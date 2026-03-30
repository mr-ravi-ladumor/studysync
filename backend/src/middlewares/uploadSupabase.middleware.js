import multer from "multer";
import ApiError from "../utils/ApiError.js";
import { allowedExtensions, allowedMimeTypes } from "../constants.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const ext = file.originalname.split('.').pop().toLowerCase();
    const mimeType = file.mimetype;

    if (allowedExtensions.includes(ext) && allowedMimeTypes.includes(mimeType)) {
        cb(null, true);
    } else {
        cb(new ApiError(401, 'Invalid file type'), false);
    }
}

const uploadAvatarToSupabase = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB
        files: 1,
    },
});

const uploadResourceToSupabase = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
        files: 1,
    },
});

export { uploadAvatarToSupabase, uploadResourceToSupabase };
