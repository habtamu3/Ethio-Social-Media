import React, { useState } from "react";
import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    IconButton,
    Typography,
    TextField,
    Button,
    useTheme
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WrapperWidget from "components/WrapperWidget";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import UserImage from "components/UserImage";
import { useNavigate } from "react-router-dom";

const WidgetPost = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments
}) => {
    const [isComments, setIsComments] = useState(false);
    const [newComment, setNewComment] = useState("");
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedUserId]);
    const likeCount = Object.keys(likes).length;
    const navigate=useNavigate();

    const palette = useTheme().palette;
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        const response = await fetch(`http://localhost:4444/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: loggedUserId })
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
    };

    const handleShare = async () => {
        try {
            await navigator.share({
                title: 'Share Title',
                text: picturePath,
                url: window.location.href,
            });
            console.log('Successfully shared');
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const patchComment = async () => {
        const response = await fetch(`http://localhost:4444/posts/${postId}/comments`, {
            method: "PATCH", // Update the method to PATCH
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: loggedUserId, comment: newComment })
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        setNewComment(""); // Clear the comment input
    };

    return (
        <WrapperWidget m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && (
        picturePath.endsWith(".mp4") ? (
            <video
                width="100%"
                height="auto"
                controls
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            >
                <source src={`http://localhost:4444/assets/public/assets/${picturePath}`} type="video/mp4" />
            </video>
        ) : (
            <img
                width="100%"
                height="auto"
                alt="post"
                style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                src={`http://localhost:4444/assets/public/assets/${picturePath}`}
            />
        )
    )}
            <FlexBetween gap="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => patchLike()}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton onClick={handleShare}>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <FlexBetween
                             gap="0.5rem"
                            onClick={()=>navigate(`/profile/${loggedUserId}`)}
                            >
                            <UserImage image={userPicturePath} /> {name}
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                {comment}
                            </Typography>
                            </FlexBetween>
                        </Box>
                    ))}
                    <Divider />
                    <Box mt="0.5rem">
                        <TextField
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            label="Write a comment"
                            fullWidth
                            multiline
                            rows={2}
                            variant="outlined"
                        />
                        <Button variant="contained" onClick={patchComment} sx={{ mt: "0.5rem" }}>
                            Post Comment
                        </Button>
                    </Box>
                </Box>
            )}
        </WrapperWidget>
    );
};

export default WidgetPost;
