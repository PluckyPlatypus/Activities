import UserController from "../../src/controllers/user.controller";
import * as UserService from "../../src/services/user.service";
import { userMock } from "../../src/models/mocks/user.mock";

describe("UserController", () => {
  const controller = new UserController();

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("postUser", () => {
    test("SHOULD call UserService with provided user object", async () => {
      const user = userMock;
      const spy = jest.spyOn(UserService, 'setCurrentUser');

      await controller.postUser(user);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(user);
    });
  });
});