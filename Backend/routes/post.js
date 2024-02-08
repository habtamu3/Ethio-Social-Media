import express from "express";
import { verifyToken } from "../middleWare/auth.js";
import { addCommentToPost, getFeedPosts, getUserPosts, likePosts } from "../controllers/post.js";


const router=express.Router();

router.get("/",verifyToken, getFeedPosts);
router.get("/:userId/posts",verifyToken,getUserPosts);
router.patch("/:id/like",verifyToken,likePosts);
router.patch("/:postId/comments", verifyToken,addCommentToPost );


export default router;