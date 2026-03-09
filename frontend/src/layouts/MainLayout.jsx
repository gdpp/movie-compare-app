import { Container } from "@mui/material";
import { Outlet } from "react-router";
import Header from "../components/header/Header";
import MovieDetailModal from "../components/movie/MovieDetailModal";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Outlet />
      </Container>
      <MovieDetailModal />
    </>
  );
};

export default MainLayout;
