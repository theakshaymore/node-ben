import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";
import {
  handleAddBlog,
  handleGetUserBlogs,
  handleGetBlogByID,
  handleAddComment,
  handleGetCommentsByBlogId,
} from "../controllers/blogs.controller.js";

const router = Router();

router.post("/add", upload.single("image"), handleAddBlog);

router.get("/getblogs", handleGetUserBlogs);

router.get("/:id", handleGetBlogByID);

router.post("/addcomment", handleAddComment);

router.get("/getcomments/:blogid", handleGetCommentsByBlogId);

export default router;
