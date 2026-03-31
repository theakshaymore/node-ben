import express from "express";
import { addToWatchlist } from "../controllers/watchlist.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/", addToWatchlist);

export default router;
