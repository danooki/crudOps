import sequelize from "../db/dbConnection.js";
import { DataTypes } from "sequelize";
import BlogPost from "./BlogPostModel.js";

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // email must be in a valid format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define relationships / associations if needed
User.hasMany(BlogPost);
BlogPost.belongsTo(User);

// Sync the model with the database
User.sync({ alter: true });

export default User;
