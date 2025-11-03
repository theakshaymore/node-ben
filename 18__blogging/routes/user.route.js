import { Router } from "express";
import { handleSignup } from "../middlewares/user.middleware.js";

const router = Router();

router.post("/signup", handleSignup);

export default router;
