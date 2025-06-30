// global error handler middleware

const errorHandler = (err, req,res, next) => {
    const statusCode = err.statusCode;
    const message = err.message || 'Something went wrong !';
    const data = err.data;

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        data,
    })
}

export default errorHandler;