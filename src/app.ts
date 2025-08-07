import express, {Express} from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes";
import enrollmentCollectionRoutes from "./routes/enrollmentCollection.routes";
import userRoutes from "./routes/user.routes";
import {authenticateToken} from "./middleware/auth.middleware";
import contactRouter from "./routes/contact.routes";
import fileUploadRoutes from "./routes/file.upload.routes";
import path from "path";

const app: Express = express();


app.use(express.json());
const allowedOrigins = [
    "http://localhost:5173"
];
const corsOptions = {
    origin: (origin: string | undefined,
             callback: (err: Error | null,
                        allow?:boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};
app.use(cors(corsOptions));
app.use("/api/auth", authRoutes)
app.use("/api/courses",authenticateToken, courseRoutes);
app.use("/api/enrollments",authenticateToken, enrollmentCollectionRoutes);
app.use("/api/users",authenticateToken, userRoutes);
app.use("/api/contacts",authenticateToken, contactRouter);

app.use("/api/upload",authenticateToken,fileUploadRoutes)
console.log("Serving static images from: ", path.join(__dirname, "uploads/course"));

app.use("/uploads/course", express.static(path.join(__dirname, "uploads/course")));

export default app;