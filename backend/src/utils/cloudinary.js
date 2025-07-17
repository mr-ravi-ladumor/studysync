import cloudinary from "../config/cloudinary.js";
import asyncHandler from "./asyncHandler.js";
import ApiError from "./ApiError.js";

// Function to delete a file from Cloudinary

export const deleteFileFromCloudinary = asyncHandler(async (public_id) => {
    if (!public_id) {
        throw new ApiError(400, 'Public ID is required to delete a file');
    }

    const result = await cloudinary.uploader.destroy(public_id);

    console.log("Cloudinary file deleted :");
    return result;
})