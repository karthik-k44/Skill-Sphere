import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dburl = process.env.DBURL;

const connectDb = async () => {
    try {
        if (!dburl) {
            throw new Error("DBURL environment variable is not defined");
        }
        await mongoose.connect(dburl)
        console.log("Database Connected Successfully!");
    } catch (error) {
        console.error("Unable to connect to the database:", (error as Error).message);
        process.exit(1);
    }
};

export default connectDb;