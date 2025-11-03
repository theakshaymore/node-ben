import { Router } from "express";
import { handleSignup, handleLogin } from "../middlewares/user.middleware.js";

const router = Router();

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

export default router;
