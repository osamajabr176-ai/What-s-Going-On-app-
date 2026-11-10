import multer, {diskStorage} from 'multer'
import crypto from "node:crypto";
import {AppError} from "../error/error.js";
import {allowedTypes} from "./file.validation.js";

function fileUpload(allowedFileTypes = allowedTypes.image){
   return multer({
       fileFilter:function (req, file, cb){
            if (!allowedFileTypes.includes(file.mimetype)){
                return cb(new AppError("Invalid file type",400));
            }
            cb(null, true);
       },
       storage: diskStorage({
           destination: './uploads',
           filename: function (req, file, callback) {
               callback(null, `${crypto.randomUUID()}-${file.originalname}`);
           }
       })
   })
}

export function uploadSingleFile(fileName,allowedFileTypes = allowedTypes.image){

    return fileUpload().single(fileName);

}

export function uploadArrayOfFiles(filedNames,allowedFileTypes = allowedTypes.image){

    return fileUpload().array(filedNames);

}

export function uploadFields(filedNames,allowedFileTypes = allowedTypes.image){

    return fileUpload().fields(filedNames);
//    fileUpload().fields([{name:'pp',maxCount:1},{name:'cover-image',maxCount:2}]);

}
