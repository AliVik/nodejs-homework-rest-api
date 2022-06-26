const express = require("express");
const request = require("supertest");
const signup = require("./signup");

const app = express();

app.post("/routes/api/users/signup", signup);

describe("test signup controller", () => {
  beforeAll(() => app.listen(3000));
  //   afterAll(() => app.close());

  test("signup response has status-code 200", async () => {
    const response = await request(app).post("/routes/api/users/signup");
    console.log("response.status", response.status);
    expect(response.status).toBe(200);
  });
});
