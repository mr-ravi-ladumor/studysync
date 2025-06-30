//custom error class for API errors
class ApiError extends Error {
    constructor(statusCode = 500, message = 'Something went wrong !', data = null){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;

        if(Error.captureStackTrace){
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;