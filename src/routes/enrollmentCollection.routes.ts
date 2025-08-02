import {Router} from "express";
import {getAllEnrollments, saveEnrollment, updateEnrollment, deleteEnrollment,getEnrollmentsByUserId} from "../controller/enrollmentCollection.controller";
import {authorizeRole} from "../middleware/auth.middleware";
const enrollmentRouter: Router = Router();

enrollmentRouter.get("/all",authorizeRole('admin'), getAllEnrollments);
enrollmentRouter.get("/user/:userId", getEnrollmentsByUserId);
enrollmentRouter.post("/save", saveEnrollment);
enrollmentRouter.put("/update/:id",authorizeRole('admin'), updateEnrollment);
enrollmentRouter.delete("/delete/:id", deleteEnrollment);

export default enrollmentRouter;