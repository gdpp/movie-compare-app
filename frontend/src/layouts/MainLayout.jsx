import { Container } from "@mui/material";
import { Outlet } from "react-router";
import { Header } from "../components";

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
