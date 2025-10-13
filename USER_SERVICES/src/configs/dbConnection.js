import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || "tauk-listflex",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "kinjal",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5500,
    dialect: "postgres",
    logging: false, 
  }
);


export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Database connected successfully!");
    await sequelize.sync({ alter: true });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    // process.exit(1); 
  }
};

