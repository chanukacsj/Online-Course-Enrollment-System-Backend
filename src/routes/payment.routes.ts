import {getAllPayments} from "../controller/payment.controller";
import {Router} from "express";
import {savePayment} from "../controller/payment.controller";

const paymentRoutes: Router = Router();

paymentRoutes.get("/all", getAllPayments);
paymentRoutes.post("/save", savePayment)

export default paymentRoutes;