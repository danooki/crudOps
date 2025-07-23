import sequelize from "../db/dbConnection.js";
import { DataTypes } from "sequelize";
import User from "./UserModel.js";

const Note = sequelize.define("Note", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasMany(Note, { foreignKey: "userId" });
Note.belongsTo(User, { foreignKey: "userId" });

Note.sync({ alter: true }); // Sync the model with the database

export default Note;
