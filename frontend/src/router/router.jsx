import { Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";
import ComparePage from "../pages/ComparePage";
import MainLayout from "../layouts/MainLayout";

function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/compare" element={<ComparePage />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
