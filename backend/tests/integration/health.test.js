import request from "supertest";
import app from "../../src/main.js";

describe("Health endpoint", () => {
  it("should return 200 and success true", async () => {
    const res = await request(app.callback()).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
