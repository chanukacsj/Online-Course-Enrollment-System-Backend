import { Request, Response } from "express";
import * as paymentService from '../services/payment.service';

export const getAllPayments = async (req: Request, res: Response) => {
    try {
        const payments = await paymentService.getAllPayment();
        res.json(payments);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}
export const savePayment = async (req: Request, res: Response) => {
    try {
        console.log("Saving payment...");
        const newPayment = req.body;
        const validationError = paymentService.validatePayment(newPayment);
        if (validationError) {
            res.status(400).json({
                error: validationError
            });
            return;
        }
        const savedPayment = await paymentService.savePayment(newPayment);
        res.status(201).json(savedPayment);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong while saving the payment'
        });
    }
}