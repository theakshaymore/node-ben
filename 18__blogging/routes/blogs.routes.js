import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";
import {
  handleAddBlog,
  handleGetUserBlogs,
} from "../controllers/blogs.controller.js";

const router = Router();

router.post("/add", upload.single("image"), handleAddBlog);

router.get("/getblogs", handleGetUserBlogs);

export default router;
