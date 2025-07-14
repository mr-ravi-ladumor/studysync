import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';


const uploadResource = asyncHandler( async (req, res) => {
    if(!req.file) {
        throw new ApiError(400, 'No file uploaded');
    }

    console.log("Cloudinary File Upload Response:", req.file);

    res.status(200).json(
        new ApiResponse(200, req.file, "File uploaded successfully")
    )
})


export {
    uploadResource,
}