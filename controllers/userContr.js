import User from "../models/UserModel.js";
import Note from "../models/NoteModel.js";

// POST Create a new user
const createUser = async (req, res) => {
  try {
    await User.create(req.body); // Create a new user with the request body
    res.json({ message: "User has been born and created" }); // Send a success message
  } catch (error) {
    res.status(500).json({ message: "Error creating that one user" }); // Handle errors by sending a 500 status with an error message
  }
};

// POST Create a new user METHOD A (alternative method)
const createUserA = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body; // Destructure the request body to get user details

    if (!firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" }); // Validate input
    }

    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating the user" }); // Handle errors by sending a 500 status with an error message
  }
};

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Couldn't fetch these blody users" }); // Handle errors by sending a 500 status with an error message
  }
};

// GET user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, { include: Note });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT Update an existing user by ID written in the request body (postman)
const updateUser = async (req, res) => {
  try {
    const {
      body: { id, firstName, lastName, email },
      /*       params: { id },
       */
    } = req;

    /*     if (!firstName || !lastName || !email)
      return res
        .status(400)
        .json({ error: "firstName, lastName, and email are required" });
 */
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.update(req.body);

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.destroy();

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  getAllUsers,
  createUser,
  createUserA,
  getUserById,
  updateUser,
  deleteUser,
};
