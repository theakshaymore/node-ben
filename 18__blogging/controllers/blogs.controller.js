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
      msg: "error in handleAddBlog()",
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
      msg: "serror in handleGetUserBlogs()",
    });
  }
}

async function handleGetAllBlogs(req, res) {
  try {
    const response = await Blog.find()
      .populate("createdBy", "fullname email profileurl") // Get author info
      .sort({ createdAt: -1 })
      .limit(50); // Limit to 50 latest blogs

    if (!response) {
      return res.status(400).json({
        success: false,
        msg: "not able to get data from DB",
      });
    }

    return res.status(200).json({
      success: true,
      blogs: response,
    });
  } catch (error) {
    console.log("Server error");
    return res.status(400).json({
      success: false,
      msg: "error in handleGetAllBlogs()",
    });
  }
}

async function handleGetBlogByID(req, res) {
  const blogId = req.params.id;
  try {
    const response = await Blog.findById(blogId);

    if (!response) {
      return res.status(404).json({
        success: false,
        msg: "not able to get blog details from DB",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "blog details fetched aptly",
      blogDetails: response,
    });
  } catch (error) {
    console.log("error in handleGetBlogByID()");
    return res.status(400).json({
      success: false,
      msg: "error in handleGetBlogByID()",
    });
  }
}

export {
  handleAddBlog,
  handleGetUserBlogs,
  handleGetAllBlogs,
  handleGetBlogByID,
};
