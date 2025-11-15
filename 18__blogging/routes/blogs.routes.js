import { Router } from "express";
import { handleAddBlog } from "../controllers/blogs.controller.js";

const router = Router();

router.post("/add", handleAddBlog);

export default router;
