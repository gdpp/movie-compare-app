import Router from "@koa/router";
import { getMovie } from "../controllers/movie.controller.js";

const router = new Router();

router.get("/api/movie/:imdbId", getMovie);

export default router;
