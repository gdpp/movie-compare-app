import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import dotenv from "dotenv";

dotenv.config();

const app = new Koa();
const router = new Router();

// Global Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);
app.use(bodyParser());

// Health Check Route
router.get("/health", (ctx) => {
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "API is running",
  };
});

// Routes Placeholder
/*
// --------------------
// Global Error Handler
// --------------------

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});
*/

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
