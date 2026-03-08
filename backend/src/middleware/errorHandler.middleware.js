import logger from "../utils/logger.js";

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error(err, "Unhandled application error");

    ctx.status = err.status || 500;

    ctx.body = {
      error: err.message || "Internal Server Error",
    };
  }
};

export default errorHandler;
