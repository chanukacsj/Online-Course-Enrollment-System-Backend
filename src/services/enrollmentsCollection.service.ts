import EnrollmentsCollection from "../model/enrollmentsCollection.model";
import { EnrollmentsCollectionDto } from "../dto/enrollmentsCollection.dto";

export const getAllEnrollments = async (): Promise<EnrollmentsCollectionDto[]> => {
    return EnrollmentsCollection.find();
};

export const saveEnrollment = async (enrollment: EnrollmentsCollectionDto): Promise<any> => {
    return EnrollmentsCollection.create(enrollment);
};

export const deleteEnrollment = async (id: number) => {
    await EnrollmentsCollection.deleteOne({ id: id });
    return true;
};

export const updateEnrollment = async (id: number, data: EnrollmentsCollectionDto) => {
    const enrollment = await EnrollmentsCollection.findOneAndUpdate({ id: id }, data, { new: true });
    if (!enrollment) {
        return null;
    }
    return enrollment;
};

export const validateEnrollment = (enrollment: EnrollmentsCollectionDto) => {
    if (!enrollment.courseId || !enrollment.userId || !enrollment.enrollmentDate) {
        return 'All fields are required';
    }
    return null;
};

export const getEnrollmentsByUserId = async (userId: number): Promise<EnrollmentsCollectionDto[]> => {
    return EnrollmentsCollection.find({ userId: userId });
};
