import mongoose from "mongoose";

const CourseModel = new mongoose.Schema({
    "id": {
        required: true,
        type: Number,
        unique: true,
        index: true
    },
    "name": {
        required: true,
        type: String
    },
    "description": {
        required: true,
        type: String
    },
    "price": {
        required: true,
        type: Number
    },
    "currency": {
        required: true,
        type: String
    },
    "image": {
        required: true,
        type: String
    }
});

const Course = mongoose.model("Course", CourseModel);
export default Course;