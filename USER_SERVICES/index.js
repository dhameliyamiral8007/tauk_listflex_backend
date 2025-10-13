import express from "express";
import dotenv from "dotenv";
import { connectMongo } from "./src/configs/mongoConnection.js";
import { connectDB } from "./src/configs/dbConnection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

(async () => {
    await connectMongo();
    await connectDB()

    app.get("/health", (req, res) => res.json({ ok: true }));

    app.listen(PORT, () => {
        console.log(`User service running on port ${PORT}`);
    });
})();
