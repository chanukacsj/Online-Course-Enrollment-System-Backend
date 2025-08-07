import {Request, Response} from "express";
import * as enrollmentCollectionService from '../services/enrollmentsCollection.service';
import {sendEnrollmentEmail} from "../utils/sendEmail";
import * as userService from '../services/user.service';
import * as courseService from '../services/course.service';
import {getUserById} from "../services/user.service";

export const getAllEnrollments = async (req: Request, res: Response) => {
    try {
        const enrollments = await enrollmentCollectionService.getAllEnrollments();
        console.log(enrollments)
        res.status(200).json(enrollments);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong while fetching enrollments'
        });
    }
}
export const saveEnrollment = async (req: Request, res: Response) => {
    try {
        const newEnrollment = req.body;
        console.log(newEnrollment)
        const validationError = enrollmentCollectionService.validateEnrollment(newEnrollment);
        if (validationError) {
            res.status(400).json({
                error: validationError
            });
            return;
        }

        const savedEnrollment = await enrollmentCollectionService.saveEnrollment(newEnrollment);
        res.status(201).json(savedEnrollment);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong while saving the enrollment'
        });
    }
}
export const getEnrollmentsByUserId = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        console.log("req.params:", req.params);

        if (isNaN(userId)) {
            res.status(400).json({
                error: 'Invalid user ID'
            });
            return;
        }
        const enrollment = await enrollmentCollectionService.getEnrollmentsByUserId(userId);
        if (!enrollment) {
            res.status(404).json({
                error: 'Enrollment not found'
            });
            return;
        }
        res.status(200).json(enrollment);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong while fetching the enrollment'
        });
    }
}
export const updateEnrollment = async (req: Request, res: Response) => {
    const enrollmentId = parseInt(req.params.enrollmentId);
    if (isNaN(enrollmentId)) {
        return res.status(400).json({ error: 'Invalid enrollment ID' });
    }

    const updatedData = req.body;

    const updatedEnrollment = await enrollmentCollectionService.updateEnrollment(enrollmentId, updatedData);
    if (!updatedEnrollment) {
        return res.status(404).json({ error: 'Enrollment not found' });
    }

    if (updatedEnrollment.status === "active") {
        const user = await userService.getUserById(updatedEnrollment.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found for this enrollment' });
        }

        const course = await courseService.getCourseById(updatedEnrollment.courseId);
        if (!course) {
            return res.status(404).json({ error: 'Course not found for this enrollment' });
        }

        try {
            await sendEnrollmentEmail(user.email, user.username, course.description);

            console.log(`Enrollment email sent to ${user.email}`);
        } catch (e) {
            console.error("Failed to send email", e);
        }
    }

    return res.status(200).json({
        message: "Enrollment updated successfully",
        data: updatedEnrollment,
    });
};


export const deleteEnrollment = async (req: Request, res: Response) => {
    const enrollmentId = parseInt(req.params.enrollmentId);
    console.log("enrollmentId:", enrollmentId);
    if (isNaN(enrollmentId)) {
        res.status(400).json({
            error: 'Invalid enrollment ID'
        });
        return;
    }
    const deleted = await enrollmentCollectionService.deleteEnrollment(enrollmentId);
    if (!deleted) {
        res.status(400).json({
            error: 'Enrollment not found'
        });
        return;
    }
    res.status(200).send({
        message: 'Enrollment deleted successfully'
    });
}