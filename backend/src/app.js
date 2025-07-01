import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// built-in middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());

//import routes
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

// global error handler middleware
import errorHandler from './middlewares/errorHandler.middleware.js';
app.use(errorHandler);
export default app;