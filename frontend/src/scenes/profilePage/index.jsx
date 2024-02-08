import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavbarPage from "scenes/navBar";
import ListOfFriendsWidget from "scenes/widgets/ListOfFriendsWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import PostWidget from "scenes/widgets/PostWidget";
import UserWidget from "scenes/widgets/UserWidget";


const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const getUser = async () => {
        const response = await fetch(`http://localhost:4444/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setUser(data);
    }
    useEffect(() => {
        getUser();
    }, []);
    if (!user) return null;
    return (
        <Box>
            <NavbarPage />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="2rem"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={user._id} picturePath={user.picturePath} />
                    <Box m="2rem 0"/>
                    <ListOfFriendsWidget userId={userId} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <PostWidget picturePath={user.picturePath} />
                    <Box m="2rem 0"/>
                    <PostsWidget userId={userId} isProfile />
                </Box>
            </Box>
        </Box>
    )
}
export default ProfilePage;