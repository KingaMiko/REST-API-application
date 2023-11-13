import request from "supertest";
import app from "../app.js";
import * as usersRepo from "#repository/users/usersRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

jest.mock("#repository/users/usersRepository.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Login User Controller", () => {
  beforeAll(() => {
    usersRepo.findUserByEmail.mockResolvedValue({
      _id: "123",
      email: "test@example.com",
      password: "hashedpassword",
      subscription: "starter",
      avatarURL: "url",
    });
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mocked_token");
  });

  it("should return status code 200 and a token on successful login", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: "test@example.com",
        subscription: "starter",
        avatarURL: "url",
      })
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
