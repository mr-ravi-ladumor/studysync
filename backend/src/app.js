import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// built-in middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

//import routes
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';
import resourceRoutes from './routes/resource.routes.js';

app.use('/api/user', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/calendar', calendarRoutes);

// global error handler middleware
import errorHandler from './middlewares/errorHandler.middleware.js';
app.use(errorHandler);
export default app;