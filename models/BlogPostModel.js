import sequelize from "../db/dbConnection.js";
import { DataTypes } from "sequelize";

const BlogPost = sequelize.define("BlogPost", {
  title: {
    type: DataTypes.STRING,
    allowNull: false, // Ensure title is not null
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
});

BlogPost.sync({ alter: true }); // Sync the model with the database

export default BlogPost;
