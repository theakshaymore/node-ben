import Blog from "../models/blog.model.js";
import imageKit from "../utils/imagekit.js";

async function handleAddBlog(req, res) {
  const { title, body } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        msg: "Image is required",
      });
    }

    // Upload to ImageKit
    const uploadResponse = await imageKit.upload({
      file: req.file.buffer, // File buffer from multer
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: `/blogs/${req.user._id}`, // Organize by user
    });

    // for local upload
    // const coverImageURL = req.file
    //   ? `/uploads/${req.user._id}/${req.file.filename}`
    //   : null;

    // if (!coverImageURL) {
    //   return res.status(400).json({
    //     success: false,
    //     msg: "Image is required",
    //   });
    // }

    const response = await Blog.create({
      title,
      body,
      coverImageURL: uploadResponse.url, // ImageKit URL
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

async function handleGetUserBlogs(req, res) {
  try {
    const response = await Blog.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });

    if (!response) {
      return res.status(404).json({
        success: false,
        msg: "not able to get data from DB",
      });
    }

    // console.log(response);

    return res.status(200).json({
      success: true,
      msg: "blogs fetched aptly",
      blogs: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "server error",
    });
  }
}

export { handleAddBlog, handleGetUserBlogs };
