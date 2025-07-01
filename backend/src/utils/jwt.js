import ApiError from '../errors/ApiError.js';
const generateJwtTokens = async(user) => {
    //console.log('Generating JWT for user:', user.email);
    if (!user || !user._id) {
        throw new ApiError('Invalid user object provided for JWT generation');
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});
    return {accessToken, refreshToken};
}

export {generateJwtTokens};