import dotenv from 'dotenv';
dotenv.config({path:'.env'});

import connectDB from './db/dbConnect.js';
import app from './app.js'


connectDB()
.then(() => {
        app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on PORT ${process.env.PORT || 8000}`);
    });
})
.catch((error) => {
    console.log("Error connecting to Mongodb", error);
})