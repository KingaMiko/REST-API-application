import { jest as jestGlobals } from "@jest/globals";
import { createRequire } from "module";
import { ErrorHandler } from "#middlewares/errorHandler.js";

const require = createRequire(import.meta.url);

jestGlobals.unstable_mockModule("#repository/users/usersRepository.js", () => ({
  findUserByEmail: jestGlobals.fn(),
  updateToken: jestGlobals.fn(),
}));

describe("Login User Controller", () => {
  let bcrypt, jwt;

  beforeEach(() => {
    jestGlobals.clearAllMocks();
    bcrypt = require("bcrypt");
    jwt = require("jsonwebtoken");

    jestGlobals.spyOn(bcrypt, "compare").mockResolvedValue(true);
    jestGlobals.spyOn(jwt, "sign").mockReturnValue("mocked_token");
  });

  it("should authenticate a user and return a token", async () => {
    const usersRepo = await import("#repository/users/usersRepository.js");

    usersRepo.findUserByEmail.mockResolvedValue({
      _id: "123",
      email: "test@example.com",
      password: "hashed_password",
      subscription: "starter",
    });

    const { loginUser } = await import("#controllers/users/loginUser.js");

    const mockReq = {
      body: { email: "test@example.com", password: "password123" },
    };
    const mockRes = {
      status: jestGlobals.fn().mockReturnThis(),
      json: jestGlobals.fn(),
    };
    const mockNext = jestGlobals.fn();

    await loginUser(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      token: "mocked_token",
      user: {
        email: "test@example.com",
        subscription: "starter",
      },
    });
  });

  it("should return status code 401 for invalid email or password", async () => {
    const usersRepo = await import("#repository/users/usersRepository.js");
    usersRepo.findUserByEmail.mockResolvedValue(null);

    const { loginUser } = await import("#controllers/users/loginUser.js");

    const mockReq = {
      body: { email: "wrong@example.com", password: "password123" },
    };
    const mockRes = {
      status: jestGlobals.fn().mockReturnThis(),
      json: jestGlobals.fn(),
    };
    const mockNext = jestGlobals.fn();

    await loginUser(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ErrorHandler));
  });

  it("should handle server errors", async () => {
    const usersRepo = await import("#repository/users/usersRepository.js");
    usersRepo.findUserByEmail.mockRejectedValue(new Error("Server error"));

    const { loginUser } = await import("#controllers/users/loginUser.js");

    const mockReq = {
      body: { email: "test@example.com", password: "password123" },
    };
    const mockRes = {
      status: jestGlobals.fn().mockReturnThis(),
      json: jestGlobals.fn(),
    };
    const mockNext = jestGlobals.fn();

    await loginUser(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
  });

  afterEach(() => {
    jestGlobals.restoreAllMocks();
  });
});
