import mangoose from "mongoose";

const EnrollmentsCollectionModel
    = new mangoose.Schema(
    {
        id: {
            required: true,
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
const EnrollmentsCollection = mangoose
    .model("EnrollmentsCollection", EnrollmentsCollectionModel);
export default EnrollmentsCollection;