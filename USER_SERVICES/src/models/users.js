import { DataTypes } from "sequelize";
import { sequelize } from "../configs/dbConnection.js";


const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "name"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "email"
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password"
    },

}, {
    tableName: "users",
    timestamps: true
});
export default User;

