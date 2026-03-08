import { jest } from "@jest/globals";

const mockLogger = { error: jest.fn() };
jest.unstable_mockModule("../../../src/utils/logger.js", () => ({
  default: mockLogger,
}));

const { default: errorHandler } = await import(
  "../../../src/middleware/errorHandler.middleware.js"
);

describe("errorHandler middleware", () => {
  let ctx;
  let next;

  beforeEach(() => {
    jest.clearAllMocks();
    ctx = {
      status: undefined,
      body: undefined,
    };
    next = jest.fn();
  });

  it("should call next() when no error occurs", async () => {
    await errorHandler(ctx, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(ctx.status).toBeUndefined();
    expect(ctx.body).toBeUndefined();
  });

  it("should set status 500 and error body when next throws", async () => {
    const err = new Error("Something broke");
    next.mockRejectedValueOnce(err);

    await errorHandler(ctx, next);

    expect(mockLogger.error).toHaveBeenCalledWith(err, "Unhandled application error");
    expect(ctx.status).toBe(500);
    expect(ctx.body).toEqual({ error: "Something broke" });
  });

  it("should use err.status when present", async () => {
    const err = new Error("Not Found");
    err.status = 404;
    next.mockRejectedValueOnce(err);

    await errorHandler(ctx, next);

    expect(ctx.status).toBe(404);
    expect(ctx.body).toEqual({ error: "Not Found" });
  });

  it("should default to Internal Server Error when err.message is empty", async () => {
    const err = new Error();
    next.mockRejectedValueOnce(err);

    await errorHandler(ctx, next);

    expect(ctx.status).toBe(500);
    expect(ctx.body).toEqual({ error: "Internal Server Error" });
  });
});
