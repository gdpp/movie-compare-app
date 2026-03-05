import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import dotenv from "dotenv";

// routes imports
import healthRoutes from "./routes/health.routes.js";
import searchRoutes from "./routes/search.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import compareRoutes from "./routes/compare.routes.js";

dotenv.config();

const app = new Koa();

// Global Error Handling Middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.error(error);

    ctx.status = error.status || 500;
    ctx.body = {
      error: error.message || "Internal Server Error",
    };
  }
});

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser());

// Routes
app.use(healthRoutes.routes());
app.use(healthRoutes.allowedMethods());
app.use(searchRoutes.routes());
app.use(searchRoutes.allowedMethods());
app.use(movieRoutes.routes());
app.use(movieRoutes.allowedMethods());
app.use(compareRoutes.routes());
app.use(movieRoutes.allowedMethods());

export default app;
