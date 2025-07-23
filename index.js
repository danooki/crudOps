import express from "express";
import {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
} from "./controllers/blogpostContr.js";
import userRouter from "./routes/userRouter.js";
import notesRouter from "./routes/notesRouter.js";

console.log(process.env.NEON_URI); // Log the environment variable for debugging

const app = express();
const port = 8080;

app.use(express.json()); // Middleware to parse JSON request bodies
app.use("/users", userRouter); // USERS ROUTER
app.use("/notes", notesRouter); // NOTES ROUTER

// test for the server
app.get("/", (req, res) => {
  // Define a route for the root URL
  res.send("Hello World!"); // Send a response to the client
});

// BLOG POST PART
app.get("/blogposts", getAllPosts); // GET via getAllPosts controller
app.get(`/blogposts/:id`, getSinglePost); // GET single post by Dynamic Routes
app.post("/blogposts", createPost); // POST Create a new blog post
app.put("/blogposts/:id", updatePost); // PUT Update an existing blog post by ID

app.listen(port, () => {
  process.env.NODE_ENV === "production" // check if variable NODE_ENV exists, would mean production
    ? console.log("Running in production mode") // Log message for production
    : console.log(`Server is running on DEV mode via http://localhost:${port}`); // development = from PC
}); // Start the server and listen on the specified port
