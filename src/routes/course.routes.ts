import {Router} from "express";
import {deleteCourse, getAllCourses, updateCourse, saveCourse} from "../controller/course.controller";
import {authorizeRole} from "../middleware/auth.middleware";
const courseRouter:Router = Router();

courseRouter.get("/all", getAllCourses);
courseRouter.post("/save",authorizeRole('admin'), saveCourse);
courseRouter.put("/update/:id",authorizeRole('admin'), updateCourse);
courseRouter.delete("/delete/:id",authorizeRole('admin'), deleteCourse);

export default courseRouter;