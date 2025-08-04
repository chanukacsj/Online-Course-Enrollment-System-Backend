import Course from "../model/course.model";
import {CourseDto} from "../dto/course.dto";
import CourseModel from "../model/course.model";


export const getCourseById = async (id: number): Promise<CourseDto | null> => {
    return await CourseModel.findOne({id}).lean();
}
export const getAllCourses = async (): Promise<CourseDto[]> => {
    return Course.find();
}

export const saveCourse = async (course: CourseDto): Promise<any> => {
    return Course.create(course);
}

export const deleteCourse = async (id: number) => {
    await Course.deleteOne({id: id});
    return true;
}

export const updateCourse = async (id: number, data: CourseDto) => {
    const course = await Course.findOneAndUpdate({id: id}, data, {new: true});
    if (!course) {
        return null;
    }
    return course;
}
export const validateCourse = (course: CourseDto) => {
    if (!course.name || !course.description || !course.price || !course.currency || !course.image) {
        return 'All fields are required';
    }
    return null;
}