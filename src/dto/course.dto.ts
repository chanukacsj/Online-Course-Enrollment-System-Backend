export interface CourseDto{
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    image: string;
    course_start_date: string;
    course_end_date: string;
}


// {
//     "_id": ObjectId,
//     "title": "Java Programming Basics",
//     "description": "Learn the fundamentals of Java programming.",
//     "price": 5000.00,      // 0 for free courses
//     "category": "Programming",
//     "imageUrl": "https://example.com/java.jpg",
//     "createdAt": ISODate,
//     "updatedAt": ISODate
// }
