import express from "express";
import { verifyToken } from "../middleWare/auth.js";
import { addRemoveFriends, getUser, getUserFriends } from "../controllers/users.js";


const router=express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.patch("/:id/:friendId/postId", verifyToken, addRemoveFriends);



export default router;