import {Request, Response} from "express";
import * as enrollmentCollectionService from '../services/enrollmentsCollection.service';


export const getAllEnrollments = async (req: Request, res: Response) => {
    try {
        const enrollments = await enrollmentCollectionService.getAllEnrollments();
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
        const userId = parseInt(req.params.id);
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
    const enrollmentId = parseInt(req.params.id);
    if (isNaN(enrollmentId)) {
        res.status(400).json({
            error: 'Invalid enrollment ID'
        });
        return;
    }
    const updatedData = req.body;
    const updatedEnrollment = await enrollmentCollectionService.updateEnrollment(enrollmentId, updatedData);
    if (!updatedEnrollment) {
        res.status(404).json({
            error: 'Enrollment not found'
        });
        return;
    }
    res.status(200).json(updatedEnrollment);
}

export const deleteEnrollment = async (req: Request, res: Response) => {
    const enrollmentId = parseInt(req.params.id);
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