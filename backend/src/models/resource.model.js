import mongoose, { Schema, model } from "mongoose";

const resourceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 80,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    resourceType: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String, // Cloudinary URL
    },

    link: {
      type: String, // External link
    },

    mimeType: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
      max: 10 * 1024 * 1024, //  Max 10MB
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resource = model("Resource", resourceSchema);
export default Resource;
