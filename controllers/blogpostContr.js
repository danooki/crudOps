import BlogPost from "../models/BlogPostModel.js";

const getAllPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll(); // Fetch all blog posts from the database
    res.json(blogPosts); // Send the blog posts as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Couldn't fetch blog posts" }); // Handle errors by sending a 500 status with an error message
  }
};

const getSinglePost = async (req, res) => {
  try {
    const id = +req.params.id; // Get the ID from the request parameters
    const post = await BlogPost.findByPk(id); // Fetch the blog post by primary key}

    if (!post) res.status(404).json({ message: "Post not founddddd" }); // If post not found, send a 404 status
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the blog post" }); //
  }
};

const createPost = async (req, res) => {
  try {
    await BlogPost.create(req.body); // Create a new blog post with the request body
    res.json({ message: "Blog post created successfully" }); // Send a success message
  } catch (error) {
    res.status(500).json({ message: "Error creating the blog post" }); // Handle errors by sending a 500 status with an error message
  }
};

//Obtener el id desde req.params.
// Buscar si existe el BlogPost con ese id.
// Si existe, actualizarlo con los datos de req.body.
// Devolver el post actualizado o un mensaje de éxito.
const updatePost = async (req, res) => {
  try {
    const id = +req.params.id; // transforms the id to a number
    const post = await BlogPost.findByPk(id); // searches for the post by primary key

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // updates the post with the data from the request body
    await post.update(req.body);

    res.json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error updating the blog post" });
  }
};

export { getAllPosts, getSinglePost, createPost, updatePost };
