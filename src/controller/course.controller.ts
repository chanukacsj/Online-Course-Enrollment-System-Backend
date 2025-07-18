import {Request, Response} from "express";
import * as courseService from '../services/course.service';

export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong while fetching courses'
        });
    }
}
export const saveCourse = async (req: Request, res: Response) => {
    try {
        const newCourse = req.body;
        const validationError = courseService.validateCourse(newCourse);
        if (validationError) {
            res.status(400).json({
                error: validationError
            });
            return;
        }

        const savedCourse = await courseService.saveCourse(newCourse);
        res.status(201).json(savedCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong while saving the course'
        });
    }
}
export const updateCourse = async (req: Request, res: Response) => {
    const courseId = parseInt(req.params.id);
    if (isNaN(courseId)) {
        res.status(400).json({
            error: 'Invalid course ID'
        });
        return;
    }
    const updatedData = req.body;
    const updatedCourse = await courseService.updateCourse(courseId,updatedData);
    if (!updatedCourse) {
        res.status(400).json({
            error: 'course not found'
        });
        return;
    }
    res.status(200).json(updatedCourse);
}
export const deleteCourse = async (req: Request, res: Response) => {
    const courseId = parseInt(req.params.id);
    if (isNaN(courseId)) {
        res.status(400).json({
            error: 'Invalid course ID'
        });
        return;
    }
    const deleted = await courseService.deleteCourse(courseId);
    if (!deleted) {
        res.status(400).json({
            error: 'course not found'
        });
        return;
    }
    res.status(200).json({
        message: 'course deleted successfully'
    });
}
