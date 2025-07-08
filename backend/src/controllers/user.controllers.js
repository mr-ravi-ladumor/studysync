import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {User} from '../models/user.model.js';
import { generateJwtTokens } from '../utils/jwt.js';

const userRegister = asyncHandler(async (req, res) => {
    // get user data from request body
    // validate user data
    // check if user already exists
    // create user in database - create entry in user collection
    //remove password and refreshToken from response
    //check for user creation success
    //send response back to frontend

    const { email, password, firstname, lastname } = req.body;

    if (!email || !password || !firstname) {
        throw new ApiError(400, 'Please provide all required fields');
    }

    const existedUser = await User.findOne({email});

    if(existedUser){
        throw new ApiError(400, 'User Account already exists with this email');
    }

    const createdUser = await User.create({
        email: email.trim().toLowerCase(),
        firstname : firstname.trim(),
        lastname : lastname.trim(),
        password,
    })

    
    if (!createdUser){
        throw new ApiError(500, 'User Account creation failed');
    }

    const user = createdUser.toObject();
    
    delete user.password;
    delete user.refreshToken;
    res.status(200).json(
       new ApiResponse(200, user, 'User Account created successfully')
    )
});

const userLogin = asyncHandler(async (req, res) => {
    //get user data from request body
    //validate 
    //check if user exists
    //check password 

    //generate access token and refresh token
    // get user data without password and refresh token
    //send response back to frontend 

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, 'Please provide all required fields');
    }

    const user = await User.findOne({email});

    if (!user) {
        throw new ApiError(401, 'User Account does not exist with this email');
    }

    const isPasswordMatched = await user.isPasswordCorrect(password);

    if (!isPasswordMatched){
        throw new ApiError(401, 'Invalid password');
    }

    const {accessToken, refreshToken} = await generateJwtTokens(user);

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    if (!loggedInUser) {
        throw new ApiError(500, 'User Account login failed');
    }

    const options = {
        httpOnly: true,
        secure  : true,
    }

    return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
        new ApiResponse(200, {user : loggedInUser}, 'User Account logged in successfully')
    )
})

const userLogout = asyncHandler(async (req,res) => {
    //clear cookies - update user refresh token to undefined
    //send response back to frontend
    const user = await User.findByIdAndUpdate(req.user?._id , 
        {
            $set: { refreshToken : undefined }
        },
        {new: true}
    )

    if (!user) {
        throw new ApiError(500, 'User Account logout failed');
    }
    const options = {
        httpOnly: true,
        secure  : true,
    }

    return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(
        new ApiResponse(200, "", 'User Account logged out successfully')
    )  
})

const updateUserData = asyncHandler(async (req, res) => {
    
    const { firstname, lastname, email } = req.body;
    const updateObj = {};
    if (firstname !== undefined && firstname !== null && firstname.trim() !== "") {
        updateObj.firstname = firstname.trim();
    } else if (firstname.trim() === "") {
        throw new ApiError(400, "Firstname cannot be empty");
    }

    if (lastname !== undefined) updateObj.lastname = lastname.trim();

    if (email !== undefined && email !== null && email.trim() !== "") {
        updateObj.email = email;
    } else if (email.trim() === "") {
        throw new ApiError(400, "Email cannot be empty");
    }

    if(Object.keys(updateObj).length === 0){
        throw new ApiError(400, 'No valid provided to update');
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        updateObj,
        { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!updatedUser) {
        throw new ApiError(500, 'User data update failed');
    }

    res
    .status(200)
    .json(
        new ApiResponse(200, updatedUser, 'User data updated successfully')
    )
})

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, conformPassword} = req.body;

    if (!oldPassword || !newPassword || !conformPassword) {
        throw new ApiError(400, 'Please provide all required fields');
    }

    if (newPassword !== conformPassword) {
        throw new ApiError(401, 'New password and confirm password do not match');
    }
    
    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const isPasswordMatched = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordMatched) {
        throw new ApiError(401, 'Old password is incorrect');
    }

    user.password = newPassword;
    const updatedUser = await user.save();

    if (!updatedUser) {
        throw new ApiError(500, 'Password change failed');
    }
    const userObj = updatedUser.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    res
    .status(200)
    .json(
        new ApiResponse(200, userObj, 'Password changed successfully')
    )
})

const deleteUser = asyncHandler(async(req,res) => {
    const userId = req.user._id;

    const user = await User.findOneAndDelete(
        {_id: userId}
    );

    res
    .status(200)
    .json(
        new ApiResponse(200, user, 'User deleted successfully')
    );
})

export {
    userRegister,
    userLogin,
    userLogout,
    updateUserData,
    changePassword,
    deleteUser
}