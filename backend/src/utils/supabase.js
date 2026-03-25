import {supabase} from '../config/supabase.js';
import  asyncHandler  from './asyncHandler.js';
import ApiError from './ApiError.js';

export const uploadFile = asyncHandler(async(file) => {
    if (!file) {
        throw new ApiError(400, "File is required");
    }

    const fileBuffer = file.buffer;
    const fileName = file.originalname;
    const fileMimeType = file.mimetype;

    const {data, error} = await supabase.storage
    .from('resources')
    .upload(fileName, fileBuffer, {
        contentType: fileMimeType,
    });

    if (error) {
        throw new ApiError(500, "Error uploading file");
    }

    return data;
});

export const deleteFile = asyncHandler(async (fileName) => {
    if (!fileName) return;
    const { error } = await supabase.storage
        .from('resources')
        .remove([fileName]);
    if (error) {
        throw new ApiError(500, `Supabase Delete Error: ${error.message}`);
    }
});