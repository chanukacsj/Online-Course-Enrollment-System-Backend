import express, {Express} from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import courseRoutes from "./routes/course.routes";
import enrollmentCollectionRoutes from "./routes/enrollmentCollection.routes";
import userRoutes from "./routes/user.routes";
import {authenticateToken} from "./middleware/auth.middleware";
import contactRouter from "./routes/contact.routes";

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

export default app;