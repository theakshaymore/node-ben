import { Router } from "express";
import { handleAddBlog } from "../controllers/blogs.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/add", upload.single("image"), handleAddBlog);

export default router;
