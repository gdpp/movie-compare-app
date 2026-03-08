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
import comparisonRoutes from "./routes/comparison.routes.js";

// Middlewares
import rateLimiter from "./middleware/rateLimiter.middleware.js";
import errorHandler from "./middleware/errorHandler.middleware.js";

dotenv.config();

const app = new Koa();

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser());

// Error Handling Middleware
app.use(errorHandler);

// Ratelimiter Middleware
app.use(rateLimiter);

// Routes
app.use(healthRoutes.routes());
app.use(healthRoutes.allowedMethods());
app.use(searchRoutes.routes());
app.use(searchRoutes.allowedMethods());
app.use(movieRoutes.routes());
app.use(movieRoutes.allowedMethods());
app.use(compareRoutes.routes());
app.use(compareRoutes.allowedMethods());
app.use(comparisonRoutes.routes());
app.use(comparisonRoutes.allowedMethods());

export default app;
