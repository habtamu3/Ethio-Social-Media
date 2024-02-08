import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { setUserLogin } from "state"; // Update the path

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Dispatch action to set user login if token exists
      dispatch(setUserLogin({ user: null, token }));
    }
  }, [dispatch]);

  const isAuth = useSelector((state) => state.token);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                isAuth ? (
                  <HomePage />
                ) : (
                  <Navigate to="/"  />
                )
              }
            />
            <Route
              path="/profile/:userId"
              element={
                isAuth ? (
                  <ProfilePage />
                ) : (
                  <Navigate to="/"  />
                )
              }
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
