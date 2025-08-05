import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

// @ts-ignore
const EnrollmentsCollectionModel = new mongoose.Schema(
    {
        enrollmentId: {
            type: Number,
            unique: true,
        },
        userId: {
            required: true,
            type: Number,
        },
        courseId: {
            required: true,
            type: Number,
        },
        enrollmentDate: {
            required: true,
            type: Date,
        },
        status: {
            required: true,
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

EnrollmentsCollectionModel.plugin(AutoIncrement, { inc_field: "enrollmentId" });

// @ts-ignore
const EnrollmentsCollection = mongoose.model(
    "EnrollmentsCollection",
    EnrollmentsCollectionModel
);

export default EnrollmentsCollection;
