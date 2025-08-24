import Payment from "../model/payment.model";
import {PaymentDto} from "../dto/paymnet.dto";

export const getAllPayment = async () => Payment.find();

export const savePayment = async (payment: PaymentDto): Promise<any> => {
  return Payment.create(payment);
}

export const validatePayment = (payment: PaymentDto): string | null => {
  if (!payment.userId || !payment.courseId || !payment.paymentDate || !payment.paymentAmount) {
    return "All fields are required.";
  }
  return null;
}
