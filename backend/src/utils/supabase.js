import { supabase } from '../config/supabase.js';
import ApiError from './ApiError.js';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (file) => {
    if (!file) {
        throw new ApiError(400, "File is required");
    }

    const fileName = `${uuidv4()}-${file.originalname}`;

    const { data, error } = await supabase.storage
        .from('resources')
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
        });

    if (error) {
        throw new ApiError(500, `Supabase Upload Error: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
        .from('resources')
        .getPublicUrl(fileName);

    return {
        url: publicUrl,
        publicId: fileName,
    };
};

export const deleteFile = async (fileName) => {
    if (!fileName) return;
    const { error } = await supabase.storage
        .from('resources')
        .remove([fileName]);
        
    if (error) {
        throw new ApiError(500, `Supabase Delete Error: ${error.message}`);
    }
};
