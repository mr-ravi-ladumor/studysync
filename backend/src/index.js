import dotenv from 'dotenv';
import connectDB from './db/dbConnect.js';
import app from './app.js'

dotenv.config({path:'.env'});

connectDB()
.then(() => {
        app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on PORT ${process.env.PORT || 8000}`);
    });
})
.catch((error) => {
    console.log("Error connecting to Mongodb", error);
})