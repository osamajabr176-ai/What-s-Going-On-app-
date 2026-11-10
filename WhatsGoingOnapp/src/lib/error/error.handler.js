import { logger } from "../../pkg/logger/logger.js";

export function globalErrorHandler(err, req, res, _next) {
    // Always log on the server side — never send stack to the client
    logger.error(err.message, { stack: err.stack, correlationId: req.correlationId });

    if (err.isOperational === true) {
        return res.status(err.statusCode).json({
            message: err.message,
            success: false,
            correlationId: req.correlationId,
            // stack only in development for local debugging
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        });
    }

    // Unexpected error — give nothing away
    return res.status(500).json({
        message: "Something went wrong",
        success: false,
        correlationId: req.correlationId,
    });
}