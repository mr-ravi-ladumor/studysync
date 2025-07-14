import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// built-in middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || true,
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

// global error handler middleware
import errorHandler from './middlewares/errorHandler.middleware.js';
app.use(errorHandler);
export default app;