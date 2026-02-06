import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import imageKit from "../utils/imagekit.js";
import { randomBytes } from "crypto";

const jobStatues = new Map();

function updateStatus(jobId, state, data = null) {
  jobStatues.set(jobId, { state, data });
}

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

// TODO: Job logic
async function handleGetAllBlogs(req, res) {
  // optimization logic
  const jobId = randomBytes(16).toString("hex");
  res.status(202).json({
    jobId,
    success: false,
    msg: "Response generation started",
    statusUrl: `/blog/${jobId}/status`,
  });

  processResponseAsync(jobId, req.body);
}

async function processResponseAsync(jobId, data) {
  try {
    updateStatus(jobId, "processing");
    const response = await Blog.find()
      .populate("createdBy", "fullname email profileurl") // Get author info
      .sort({ createdAt: -1 })
      .limit(10); // Limit to 50 latest blogs

    if (!response) {
      updateStatus(jobId, "failed", { error: "No data found" });
      return;
    }
    updateStatus(jobId, "completed", response);
  } catch (error) {
    updateStatus(jobId, "failed", error);
  }
}

async function handleJobStatus(req, res) {
  const { jobId } = req.params;

  const status = jobStatues.get(jobId);

  if (!status) {
    return res.status(404).json({
      msg: "Job not found",
    });
  }

  res.json(status);
}

async function handleGetBlogByID(req, res) {
  const blogId = req.params.id;

  try {
    const response = await Blog.findById(blogId).populate(
      "createdBy",
      "fullname email profileurl",
    );

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

async function handleAddComment(req, res) {
  const { content, blogId } = req.body;

  try {
    if (!content || !blogId) {
      return res.status(400).json({
        success: false,
        msg: "Content and blogId are required",
      });
    }

    // Create comment
    const response = await Comment.create({
      content,
      createdBy: req.user._id,
      blogId,
    });

    res.status(201).json({
      success: true,
      msg: "Comment added aptly",
      comment: response,
    });
  } catch (error) {
    console.log("Error adding comment:", error);
    res.status(500).json({
      success: false,
      msg: "error in handleAddComment()",
    });
  }
}

async function handleGetCommentsByBlogId(req, res) {
  const blogId = req.params.blogid;

  try {
    const response = await Comment.find({ blogId }).populate(
      "createdBy",
      "fullname profileurl",
    );

    if (!response) {
      return res.status(400).json({
        success: false,
        msg: "no comments yet",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "comment fetched aptly",
      comments: response,
    });
  } catch (error) {
    console.log("error fetching comments", error);
    return res.status(400).json({
      success: false,
      msg: "error in handleGetCommentsByBlogId()",
    });
  }
}

async function handleDeleteBlog(req, res) {
  try {
    const response = await Blog.findByIdAndDelete(req.params.id);

    if (!response) {
      return res.status(400).json({
        success: false,
        msg: "not able to delete blog",
      });
    }
    //
    return res.status(200).json({
      success: true,
      msg: "blog deleted aptly",
    });
  } catch (error) {
    console.log("error deleting blog", error);
    return res.status(400).json({
      success: false,
      msg: "error in handleDeleteBlog()",
    });
  }
}

async function handleEditBlog(req, res) {
  try {
    const response = await Blog.findById(req.params.id);

    if (!response) {
      return res.status(400).json({
        success: false,
        msg: "not able to edit blog",
      });
    }
    //
    return res.status(200).json({
      success: true,
      msg: "blog edited aptly",
      blog: response,
    });
  } catch (error) {
    console.log("error editing blog", error);
    return res.status(400).json({
      success: false,
      msg: "error in handleEditBlog()",
    });
  }
}

export {
  handleAddBlog,
  handleGetUserBlogs,
  handleGetAllBlogs,
  handleGetBlogByID,
  handleAddComment,
  handleGetCommentsByBlogId,
  handleDeleteBlog,
  handleEditBlog,
  handleJobStatus,
};
