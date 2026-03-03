export const health = (ctx) => {
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "API is running",
  };
};
