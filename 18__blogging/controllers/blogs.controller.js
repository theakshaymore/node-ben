import Blog from "../models/blog.model.js";

async function handleAddBlog(req, res) {
  const { title, body, imageURL } = req.body;

  try {
    const response = await Blog.create({
      title,
      body,
      coverImageURL: imageURL,
      createdBy: req.user._id,
    });

    // console.log(response);

    res.status(201).json({
      success: true,
      msg: "Blog created successfully",
      blog: response,
    });
  } catch (error) {
    console.log("Error creating blog:", error);
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
}

export { handleAddBlog };
