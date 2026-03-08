import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { Link, useLocation } from "react-router";

const Header = () => {
  const location = useLocation();

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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
