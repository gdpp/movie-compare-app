import Router from "@koa/router";
import { compareMovies } from "../controllers/compare.controller.js";

const router = new Router();

router.post("/api/compare", compareMovies);

export default router;
