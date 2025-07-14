import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

export const verifyAuthToken = asyncHandler(async(req, _, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if(!token) {
        throw new ApiError(401, "Auth :: Unauthorized access, please login to continue");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded || !decoded._id) {
        throw new ApiError(401, "Auth :: Invalid token, please login again");
    }

    const user = await User.findById(decoded._id).select("-password -refreshToken");

    if(!user) {
        throw new ApiError(401, "Auth middleware :: User not found");
    }
    req.user = user;
    next();
})

 