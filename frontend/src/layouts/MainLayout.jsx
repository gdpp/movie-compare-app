import { Container } from "@mui/material";
import { Outlet } from "react-router";
import Header from "../components/header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
