import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {allowedMimeTypes} from '../utils/validateFile.js';
import Resource from '../models/resource.model.js';


const uploadResource = asyncHandler( async (req, res) => {
    const {title, resourceType, subject, link} = req.body;

    if (!title || !resourceType || !subject) {
        throw new ApiError(400, 'Title, Resource Type, and Subject are required');
    }

    if (resourceType && resourceType === 'link'){
        try {
            new URL(link); 
        } catch (error) {
            throw new ApiError(400, 'Invalid URL format');
        }

        const resource = await Resource.create({
        title,
        subject,
        resourceType,
        link,
        owner: req.user._id,
        size: 0,
        mimeType: "link/url",
        originalFileName: null,
        fileUrl: null,
        });

        return res
        .status(201)
        .json(new ApiResponse(201, resource, "Link resource saved"));
    }
    

    if(!req.file) {
        throw new ApiError(400, 'No file uploaded');
    }

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
        throw new ApiError(400, `Invalid file type ${req.file.mimetype}`);
    }

    if (req.file.size > 10 * 1024 * 1024) {
        throw new ApiError(400, 'File size exceeds the limit of 10 MB');
    }

    const resource = await Resource.create({
        title: title,
        originalFileName: req.file.originalname,
        resourceType: resourceType,
        subject: subject,
        fileUrl: req.file.path,
        mimeType: req.file.mimetype,
        size: req.file.size,
        owner: req.user._id,
    });
    // console.log("Resource Created:", resource);

    if (!resource) {
        throw new ApiError(500, 'Failed to create resource in database');
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, resource, 'Resource uploaded successfully')
    );
})

const getAllResources = asyncHandler(async (req, res) => {
    const resources = await Resource.find(
        {
            owner: req.user._id
        }
    )

    if (!resources) {
        throw new ApiError(404, 'No resources found');
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, resources, 'All Resources retrieved successfully')
    );
})


export {
    uploadResource,
    getAllResources,
}