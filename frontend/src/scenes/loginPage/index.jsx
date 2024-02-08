import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Form from "./Form"; // Renamed import to avoid conflict with MUI Form component
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const LoginPage = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const isAuth = useSelector((state) => !!state.token); // Checking if the token exists
    const navigate = useNavigate();

    // Redirecting to the home page if already authenticated
    useEffect(() => {
        if (isAuth) {
            navigate("/home");
        }
    }, [isAuth, navigate]);

    return (
        <Box>
            <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign="center">
                <Typography fontWeight="bold" fontSize="32px" color="primary">
                    Social Media
                </Typography>
            </Box>
            <Box
                width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Welcome to My Social Media
                </Typography>
                <Form />
            </Box>
        </Box>
    );
}

export default LoginPage
