import { supabase } from '../config/supabase.js';
import ApiError from './ApiError.js';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (file, bucket = 'resources') => {
    if (!file) {
        throw new ApiError(400, "File is required");
    }

    const fileName = `${uuidv4()}-${file.originalname}`;

    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
        });

    if (error) {
        throw new ApiError(500, `Supabase Upload Error: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

    return {
        url: publicUrl,
        publicId: fileName,
    };
};

export const deleteFile = async (publicId, bucket = 'resources') => {
    if (!publicId) {
        return;
    }
    const { error } = await supabase.storage
        .from(bucket)
        .remove([publicId]);

    if (error) {
        throw new ApiError(500, `Supabase Delete Error: ${error.message}`);
    }
};
