import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import fileFilter from "../utils/validateFile.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = file.originalname.split('.').pop().toLowerCase();
    const cleanName = file.originalname
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_');

    // Decide resource_type and allowed_formats based on file type
    let resource_type = 'raw';
    let allowed_formats = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt'];
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) {
      resource_type = 'image';
      allowed_formats = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    }

    return {
      folder: "studysync_resources",
      resource_type,
      public_id: cleanName,
      format: ext,
      use_filename: false,
      unique_filename: false,
    };
  },
});


const uploadCloud = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
        files: 1, 
    },
 });
export default uploadCloud;
