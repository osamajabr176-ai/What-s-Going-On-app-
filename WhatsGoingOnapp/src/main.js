import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './lib/db/mongoose.js';
import cors from 'cors';
import { globalErrorHandler } from "./lib/error/error.handler.js";
import { appRouter } from "./routes.js";
import { correlationId } from "./pkg/correlation/correlationId.js";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import { AppError } from './lib/error/error.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
    const app = express();

    // Trust the first hop (nginx reverse proxy) so req.ip is the real client IP
    app.set('trust proxy', 1);

    // 1. CORS must come first so pre-flight OPTIONS and error responses get the header
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:5173'],
        credentials: true,
    }));

    // 2. Security hygiene
    app.disable('x-powered-by');

    // 3. Global rate limiter (coarse; per-route limiters are added separately)
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 100,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
        handler: (_req, _res, next) => {
            next(new AppError('Too many requests, please try again later.', 429));
        },
    });
    app.use(limiter);

    // 4. Body parsing — explicit size limit to prevent large-payload DoS
    app.use(express.json({ limit: '50kb' }));

    // 5. Serve uploaded files (absolute path, no web-root confusion)
    app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

    app.use(cookieParser());
    app.use(correlationId);

    app.use('/api', appRouter);

    // 6. 404 fallback — before globalErrorHandler
    app.use((_req, _res, next) => {
        next(new AppError('Route not found', 404));
    });

    app.use(globalErrorHandler);

    return app;
}