import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {allowedMimeTypes} from '../constants.js';
import Resource from '../models/resource.model.js';
import {deleteFileFromCloudinary} from '../utils/cloudinary.js';


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
            resourceType,
            subject,
            link,
            owner: req.user._id,
            mimeType: "link/url",
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
        publicId: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        owner: req.user._id,
    });

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

const getResourceById = asyncHandler(async (req, res) => {
    const resourceId = req.params.resourceId;

    if (!resourceId) {
        throw new ApiError(400, 'Resource ID is required');
    }

    const resource = await Resource.findOne({
        _id : resourceId,
        owner : req.user._id
    });

    if (!resource) {
        throw new ApiError(404, 'Resource not found');
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, resource, 'Resource retrieved successfully')
    );
})


const updateResource = asyncHandler(async (req, res) => {
    const resourceId = req.params.resourceId;

    if (!resourceId) {
        throw new ApiError(400, 'Resource ID is required');
    }

    const existingResource = await Resource.findOne({
        _id: resourceId,
        owner: req.user._id
    })

    if (!existingResource) {
        throw new ApiError(404, 'Resource not found');
    }

    const {title, resourceType, subject, link} = req.body;

    if (!title || !resourceType || !subject) {
        throw new ApiError(400, 'Title, Resource Type, and Subject are required');
    }
    // case - 1:  just title, subject
    // case - 2 : link update (resourceType is link)
    // case - 3 : file update
    // case - 4/5 : file -> link or link -> file update

    // update the title, subject
    existingResource.title = title;
    existingResource.subject = subject;

    // case - 1: just title and subject update
    if (resourceType !== 'link' && !req.file) {
        await existingResource.save();
        return res
        .status(200)
        .json(new ApiResponse(200, existingResource, "Resource updated with title and subject"));
    }

    // 2 link to link update
    if (resourceType === 'link' && existingResource.resourceType === 'link') {
        try {
            new URL(link); 
        } catch (error) {
            throw new ApiError(400, 'Invalid URL format');
        }
        
        existingResource.resourceType = resourceType;
        existingResource.link = link;
        await existingResource.save();

        return res
        .status(200)
        .json(new ApiResponse(200, existingResource, "Link resource updated"));
    }

    // 3 - file to file update
    else if (resourceType !== 'link' && existingResource.resourceType !== 'link') {
        if (!req.file) {
            throw new ApiError(400, 'No file uploaded');
        }

        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            throw new ApiError(400, `Invalid file type ${req.file.mimetype}`);
        }

        if (req.file.size > 10 * 1024 * 1024) {
            throw new ApiError(400, 'File size exceeds the limit of 10 MB');
        }

        //delete the existing file from cloudinary
        await deleteFileFromCloudinary(existingResource.publicId);
        existingResource.originalFileName = req.file.originalname;
        existingResource.resourceType = resourceType;
        existingResource.fileUrl = req.file.path;
        existingResource.publicId = req.file.filename;
        existingResource.mimeType = req.file.mimetype;
        existingResource.size = req.file.size;
        await existingResource.save();

        return res
        .status(200)
        .json(new ApiResponse(200, existingResource, "Resource updated with new file"));
    }

    // 4 - file to link update
    else if (resourceType === 'link' && existingResource.resourceType !== 'link') {
        try {
            new URL(link); 
        } catch (error) {
            throw new ApiError(400, 'Invalid URL format');
        }
        
        //delete the existing file from cloudinary
        await deleteFileFromCloudinary(existingResource.publicId);

        existingResource.resourceType = resourceType;
        existingResource.link = link;
        existingResource.mimeType = "link/url";
        existingResource.fileUrl = undefined;
        existingResource.publicId = undefined;
        existingResource.size = undefined;
        existingResource.originalFileName = undefined;

        await existingResource.save();

        return res
        .status(200)
        .json(new ApiResponse(200, existingResource, "Resource updated to link"));

    }

    // 5 - link to file update
    else if (resourceType !== 'link' && existingResource.resourceType === 'link') {
        if (!req.file) {
            throw new ApiError(400, 'No file uploaded');
        }
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            throw new ApiError(400, `Invalid file type ${req.file.mimetype}`);
        }


        if (req.file.size > 10 * 1024 * 1024) {
            throw new ApiError(400, 'File size exceeds the limit of 10 MB');
        }

        existingResource.originalFileName = req.file.originalname;
        existingResource.resourceType = resourceType;
        existingResource.fileUrl = req.file.path;
        existingResource.publicId = req.file.filename;
        existingResource.mimeType = req.file.mimetype;
        existingResource.size = req.file.size;
        existingResource.link = undefined;

        await existingResource.save();

        return res
        .status(200)
        .json(new ApiResponse(200, existingResource, "Resource updated to file"));
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, existingResource, 'Resource updated successfully')
    );
})

const deleteResource = asyncHandler(async (req, res) => {
    const resourceId = req.params.resourceId;
    if (!resourceId) {
        throw new ApiError(400, 'Resource ID is required');
    }
    const resource = await Resource.findOneAndDelete({
        _id: resourceId,
        owner: req.user._id.toString()
    });
    if (!resource) {
        throw new ApiError(404, 'Resource not found');
    }

    // If the resource is a file (not a link), delete it from Cloudinary
    if (resource && resource.resourceType !== 'link') {
        await deleteFileFromCloudinary(resource.publicId);
    }

    

    res
    .status(200)
    .json(
        new ApiResponse(200, resource, 'Resource deleted successfully')
    );
})

export {
    uploadResource,
    getAllResources,
    getResourceById,
    updateResource,
    deleteResource
}