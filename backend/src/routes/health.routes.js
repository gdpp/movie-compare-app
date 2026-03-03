import Router from "@koa/router";
import { health } from "../controllers/health.controller.js";

const router = new Router();

router.get("/api/health", health);

export default router;
