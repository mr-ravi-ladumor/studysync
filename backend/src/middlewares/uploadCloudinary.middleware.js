import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import fileFilter from "../utils/validateFile.js";
import { v4 as uuidv4 } from 'uuid';

const storage = new CloudinaryStorage({
  cloudinary,
  params:  (req, file) => {
    const ext = file.originalname.split('.').pop().toLowerCase();
    if (!ext) {
      throw new Error('File extension is required');
    }
    const cleanName = file.originalname
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_') + `_${uuidv4()}`; 
    // Decide resource_type and allowed_formats based on file type
    let resource_type = 'raw';
    let allowed_formats = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt'];
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
      resource_type = 'image';
      allowed_formats = ['jpg', 'jpeg', 'png'];
    }

    return {
      folder: `studysync_resources/${req.user._id}`,
      public_id: cleanName,
      allowed_formats,
      resource_type,
      format: ext,
      use_filename: false,
      unique_filename: false,
    };
  },
});

console.log("Cloudinary Storage Configured:");


const uploadCloud = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
        files: 1, 
    },
 });
export default uploadCloud;
