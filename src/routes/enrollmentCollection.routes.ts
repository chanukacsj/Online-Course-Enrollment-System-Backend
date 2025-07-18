import {Router} from "express";
import {getAllEnrollments, saveEnrollment, updateEnrollment, deleteEnrollment,getEnrollmentsByUserId} from "../controller/enrollmentCollection.controller";
const enrollmentRouter: Router = Router();

enrollmentRouter.get("/all", getAllEnrollments);
enrollmentRouter.get("/user/:userId", getEnrollmentsByUserId);
enrollmentRouter.post("/save", saveEnrollment);
enrollmentRouter.put("/update/:id", updateEnrollment);
enrollmentRouter.delete("/delete/:id", deleteEnrollment);

export default enrollmentRouter;