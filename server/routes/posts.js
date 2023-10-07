import express from "express";
import { getUserPosts, getFeedPosts, likePosts } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);

// UPDATE
router.patch("/id",verifyToken, likePosts);

export default router;