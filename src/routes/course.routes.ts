import {Router} from "express";
import {deleteCourse, getAllCourses, updateCourse, saveCourse} from "../controller/course.controller";
const courseRouter:Router = Router();

courseRouter.get("/all", getAllCourses);
courseRouter.post("/save", saveCourse);
courseRouter.put("/update/:id", updateCourse);
courseRouter.delete("/delete/:id", deleteCourse);

export default courseRouter;