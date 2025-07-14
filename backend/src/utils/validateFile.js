import ApiError from './ApiError.js';

const allowedExtensions = [
  "pdf",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "txt",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
];

const allowedMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'image/jpeg', 'image/png', 'image/gif', 'image/webp'
];

const fileFilter = (req, file, cb) => {
    const ext = file.originalname.split('.').pop().toLowerCase();
    const mimeType = file.mimetype;

    if( allowedExtensions.includes(ext) && allowedMimeTypes.includes(mimeType)) {
        cb(null, true);
    } else {
        cb(new ApiError(401,'Invalid file type'), false);
    }
}

export default fileFilter;