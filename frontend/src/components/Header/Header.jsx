import { useContext } from "react";
import { AppBar, Toolbar, Button, Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link, useLocation } from "react-router";
import { ThemeContext } from "../../context/themeContext";

const Header = () => {
  const location = useLocation();
  const { mode, toggleTheme } = useContext(ThemeContext);

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            color={isActive("/") ? "secondary" : "inherit"}
            variant={isActive("/") ? "contained" : "text"}
            sx={{
              textTransform: "none",
              transition: "all 0.2s",
              fontSize: "1rem",
              "&:hover": {
                transform: "translateY(-1px)",
              },
            }}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/compare"
            startIcon={<CompareArrowsIcon />}
            color={isActive("/compare") ? "secondary" : "inherit"}
            variant={isActive("/compare") ? "contained" : "text"}
            sx={{
              textTransform: "none",
              transition: "all 0.2s",
              fontSize: "1rem",
              "&:hover": {
                transform: "translateY(-1px)",
              },
            }}
          >
            Compare
          </Button>
        </Box>

        <IconButton
          onClick={toggleTheme}
          color="inherit"
          aria-label={
            mode === "light" ? "Change to dark mode" : "Change to light mode"
          }
          sx={{ "&:hover": { opacity: 0.9 } }}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
