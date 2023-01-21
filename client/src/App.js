import { BrowserRouter , Naviagte , Routes , Route, Navigate } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline , ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";

function App() {

    const mode = useSelector(state => state.mode)
    const theme = useMemo(()=>createTheme(themeSettings(mode)) , [mode])
    const isAuth = Boolean(useSelector(state => state.token))

  return (
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
         <Routes>
            <Route path="/">
              <Route index element={<LoginPage/>}/>
              <Route path="home" element={isAuth ? <HomePage/> : <Navigate to="/" />}/>
              <Route path="profile/:userId" element={isAuth ? <ProfilePage/> : <Navigate to="/" />}/>
            </Route>
         </Routes>
         </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
