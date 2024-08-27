import mongoose from "mongoose";

const dbConnection = async (DATABASE_URL) =>{
    try{
        const DB_OPTIONS = {
            dbName : "blog-platform"
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log("Database connected successfully...");
    }
    catch(err){
        console.log('Error while connecting database... ',err);
    }
}

export default dbConnection;
