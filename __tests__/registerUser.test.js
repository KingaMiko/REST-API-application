import { jest as jestGlobals } from "@jest/globals";

jestGlobals.unstable_mockModule("#repository/users/usersRepository.js", () => ({
  findUserByEmail: jestGlobals.fn(),
  createUser: jestGlobals.fn(),
}));

describe("Register User Controller", () => {
  beforeEach(() => {
    jestGlobals.clearAllMocks();
  });

  it("should register a user and return status code 201", async () => {
    const usersRepo = await import("#repository/users/usersRepository.js");

    usersRepo.findUserByEmail.mockResolvedValue(null);
    usersRepo.createUser.mockResolvedValue({
      email: "newuser@example.com",
      subscription: "starter",
      avatarURL: "url_to_avatar",
    });

    const { registerUser } = await import("#controllers/users/registerUser.js");

    const mockReq = {
      body: { email: "newuser@example.com", password: "password123" },
    };
    const mockRes = {
      status: jestGlobals.fn().mockReturnThis(),
      json: jestGlobals.fn(),
    };
    const mockNext = jestGlobals.fn();

    await registerUser(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      user: {
        email: "newuser@example.com",
        subscription: "starter",
        avatarURL: "url_to_avatar",
      },
    });
  });

  it("should return status code 409 if email is already in use", async () => {
    const usersRepo = await import("#repository/users/usersRepository.js");

    usersRepo.findUserByEmail.mockResolvedValue({
      email: "existing@example.com",
    });

    const { registerUser } = await import("#controllers/users/registerUser.js");

    const mockReq = {
      body: { email: "existing@example.com", password: "password123" },
    };
    const mockRes = {
      status: jestGlobals.fn().mockReturnThis(),
      json: jestGlobals.fn(),
    };
    const mockNext = jestGlobals.fn();

    await registerUser(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(409);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Email in use" });
  });

  it("should handle server errors", async () => {
    const usersRepo = await import("#repository/users/usersRepository.js");
    usersRepo.findUserByEmail.mockRejectedValue(new Error("Server error"));

    const { registerUser } = await import("#controllers/users/registerUser.js");

    const mockReq = {
      body: { email: "test@example.com", password: "password123" },
    };
    const mockRes = {
      status: jestGlobals.fn().mockReturnThis(),
      json: jestGlobals.fn(),
    };
    const mockNext = jestGlobals.fn();

    await registerUser(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
  });

  afterEach(() => {
    jestGlobals.restoreAllMocks();
  });
});
