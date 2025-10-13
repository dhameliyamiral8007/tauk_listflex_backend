import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.MONGO_URI;

export const connectMongo = async () => {
    try {
        if (!dbUrl) throw new Error("MongoDB URL is missing from .env file");

        await mongoose.connect(dbUrl);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};