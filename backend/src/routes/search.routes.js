import Router from "@koa/router";
import { search } from "../controllers/search.controller.js";

const router = new Router();

router.get("/api/search", search);

export default router;
