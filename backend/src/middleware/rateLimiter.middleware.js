import ratelimit from "koa-ratelimit";

const db = new Map();

const rateLimiter = ratelimit({
  driver: "memory",
  db: db,
  duration: 60000, // 1 minuto
  errorMessage: "Too many requests, please try again later.",
  id: (ctx) => ctx.ip,
  max: 60,
  headers: {
    remaining: "Rate-Limit-Remaining",
    reset: "Rate-Limit-Reset",
    total: "Rate-Limit-Total",
  },
});

export default rateLimiter;
