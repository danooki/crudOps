import { Router } from "express";
import {
  getAllUsers,
  createUser,
  createUserA,
  updateUser,
  deleteUser,
  getUserById,
} from "../controllers/userContr.js";

const userRouter = Router();

userRouter.post("/", createUser); // POST Create a new user
userRouter.post("/usersA", createUserA); // POST Create a new user A METHOD
userRouter.get("/", getAllUsers); // GET all users
userRouter.get("/:id", getUserById); // GET user by ID
userRouter.put("/", updateUser); // PUT Update an existing user
userRouter.delete("/:id", deleteUser); // DELETE a user by ID

// userRouter.route("/".post(createUser).get(getAllUsers).put(updateUser)); // Chained route for POST, GET, and PUT

export default userRouter; // Export the userRouter for use in other files
