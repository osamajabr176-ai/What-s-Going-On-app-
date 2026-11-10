import {z} from "zod";
import { Types } from "mongoose";

export const messageDTO = z.object({
    content: z.string().min(1).max(500).trim(),
    receiver: z.string().min(1).refine((value) => {
        return Types.ObjectId.isValid(value);
    }, {
        message: "Invalid receiver ID format",
    }),
    sender: z.string().min(1).optional()
})