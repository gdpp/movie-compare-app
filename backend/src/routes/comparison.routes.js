import Router from "@koa/router";
import { recentComparisons } from "../controllers/comparisons.controller.js";

const router = new Router({
  prefix: "/api/comparisons",
});

router.get("/recent", recentComparisons);

export default router;
