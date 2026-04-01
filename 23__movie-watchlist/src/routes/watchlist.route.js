import express from "express";
import {
  addToWatchlist,
  deleteFromWatchlist,
} from "../controllers/watchlist.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

// router.use(isAuthenticated);

router.post("/", isAuthenticated, addToWatchlist);

router.delete("/:id", isAuthenticated, deleteFromWatchlist);

export default router;
