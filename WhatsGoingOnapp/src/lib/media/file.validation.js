import { fileTypeFromBuffer } from "file-type";
import fs from "node:fs";
import {AppError} from "../error/error.js";

export const allowedTypes = {
    image: ['image/png','image/jpg','image/jpeg'],
    video: ['video/mp4','video/webm'],
    audio: ['audio/mp4','audio/mp4'],
    cv:['application/pdf','application/msword']
};
// Middleware to validate file type by magic number (file signatures)
export const fileValidation = (allowedFileTypes = allowedTypes.image) => async (req, res, next) => {
    try {
        if (req.file.size > 5 *1024 * 1024) {
            fs.unlinkSync(req.file);
            return new AppError("Large file exceeded the size allowed",400)
        }
        // get the file path
        const filePath = req.file.path;
        // read the file and return buffer
        const buffer = fs.readFileSync(filePath);
        // get the file type
        const type = await fileTypeFromBuffer(buffer);
        // validate
        if (!type || !allowedFileTypes.includes(type.mime)) {
            fs.unlinkSync(filePath);
            return next(new AppError("Invalid file type", 400));
        }
        return next();
    } catch (error) {
        return next(error);
    }
};