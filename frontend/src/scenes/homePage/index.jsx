import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavbarPage from "scenes/navBar";
import UserWidget from "scenes/widgets/UserWidget";
import PostWidget from "scenes/widgets/PostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdWidget from "scenes/widgets/AdWidget";
import ListOfFriendsWidget from "scenes/widgets/ListOfFriendsWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    
    return (
        <Box>
            <NavbarPage />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                    maxHeight="calc(100vh - 64px - 4rem)" // Adjust the height to prevent scrolling the entire page
                    overflow="auto" // Make the box scrollable
                >
                    <Box overflow="hidden"> {/* Ensure no double scrollbars */}
                        <PostWidget picturePath={picturePath} />
                        <PostsWidget userId={_id} />
                    </Box>
                </Box>
                {isNonMobileScreens && 
                    <Box flexBasis="26%">
                        <AdWidget />
                        <Box m="2rem 0" />
                        <ListOfFriendsWidget userId={_id}/>
                    </Box>
                }
            </Box>
        </Box>
    );
}

export default HomePage;