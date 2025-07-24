import mongoose from "mongoose";

const EnrollmentsCollectionModel
    = new mongoose.Schema(
    {
        id: {
            required: false,
            type: Number,
            unique: true,
            index: true
        },
        userId: {
            required: true,
            type: Number
        },
        courseId: {
            required: true,
            type: Number
        },
        enrollmentDate: {
            required: true,
            type: Date
        },
        status: {
            required: true,
            type: String
        }
        }
    );
const EnrollmentsCollection = mongoose
    .model("EnrollmentsCollection", EnrollmentsCollectionModel);
export default EnrollmentsCollection;