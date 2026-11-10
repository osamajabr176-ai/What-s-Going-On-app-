import {z} from 'zod'
import {AppError} from "../error/error.js";

export function validation(dto,body){
    const result = dto.safeParse(body);
    if(result.success === false){
        const errMessage = result.error.issues.map(issue=>{
            return `${issue.path} : ${issue.message}`
        })
        throw new AppError(errMessage.join(','),400);
    }
    return result.data;
}