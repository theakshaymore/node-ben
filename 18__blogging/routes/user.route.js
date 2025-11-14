import { Router } from "express";
import {
  handleSignup,
  handleLogin,
  handleLogout,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

router.post("/logout", handleLogout);

export default router;
