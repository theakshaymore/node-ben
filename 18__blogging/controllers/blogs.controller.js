import Blog from "../models/blog.model.js";

async function handleAddBlog(req, res) {
  const { title, body } = req.body;

  try {
    const coverImageURL = req.file
      ? `/uploads/${req.user._id}/${req.file.filename}`
      : null;

    if (!coverImageURL) {
      return res.status(400).json({
        success: false,
        msg: "Image is required",
      });
    }

    const response = await Blog.create({
      title,
      body,
      coverImageURL,
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
