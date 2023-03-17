import request from "supertest";
import app from "../app";

describe("GET /activity", () => {
  test("SHOULD return status code 200 and random activity", async () => {
    const response = await request(app).get("/activity");
    const body = response.body;
    
    expect(response.statusCode).toBe(200);

    expect(body).not.toBeNull();
    expect(body.error).toBeUndefined();
    expect(body.activity).toBeDefined();
  });
});

describe("POST /user", () => {
  test("SHOULD return status code 204 WHEN user profile is valid", async () => {
    const response = await request(app).post("/user").send({
      name: "valid user",
      accessibility: "High",
      price: "Free"
    });
    
    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual({});
  });

  test("SHOULD return status code 400 WHEN no user is sent", async () => {
    const response = await request(app).post("/user");

    expect(response.statusCode).toBe(400);
    expect(response.body.error).not.toBeNull();
  });

  test("SHOULD return status code 400 WHEN invalid user is sent", async () => {
    const response = await request(app).post("/user").send({
      name: "invalid user",
      accessibility: "No",
      price: "Free"
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).not.toBeNull();
  });

  test("SHOULD return status code 400 WHEN incomplete user is sent", async () => {
    const response = await request(app).post("/user").send({
      name: "invalid user",
      accessibility: "High",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).not.toBeNull();
  });
});