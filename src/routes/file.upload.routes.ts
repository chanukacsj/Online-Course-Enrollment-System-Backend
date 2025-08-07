import {Router} from "express";
import {uploadProductImage} from "../utils/file.upload.util";
import {handleUpload} from "../controller/file.upload.controller";

const fileUploadRoutes: Router = Router();
console.log("File upload routes initialized");
fileUploadRoutes.post("/course", uploadProductImage.single("photo"), handleUpload);

export default fileUploadRoutes;