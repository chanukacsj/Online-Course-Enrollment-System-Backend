import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

// @ts-ignore
const PaymentModel = new mongoose.Schema(
    {
        "paymentId": {
            type: Number,
            unique: true,
        },
        "userId": {
            required: true,
            type: Number,
        },
        "courseId": {
            required: true,
            type: Number,
        },
        "paymentDate": {
            required: true,
            type: Date,
        },
        "paymentAmount": {
            required: true,
            type: Number,
        },

    },
    {
        timestamps: true,
    }
);
PaymentModel.plugin(AutoIncrement, {inc_field: "paymentId"});

// @ts-ignore
const Payment = mongoose.model("Payment", PaymentModel);
export default Payment;
