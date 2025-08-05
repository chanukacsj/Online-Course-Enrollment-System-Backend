import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const CourseModel =
    new mongoose.Schema(
        {
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
            },
            "course_start_date": {
                type: String,
                required: true
            },
            "course_end_date": {
                type: String,
                required: true
            }
        });

CourseModel.plugin(AutoIncrement, { inc_field: "id" });


// @ts-ignore
const Course = mongoose.model("Course", CourseModel);
export default Course;