class AppError extends Error {
    statusCode;
    isOperationError;
    constructor(message,statusCode,isOperational = true) {

        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
export { AppError };