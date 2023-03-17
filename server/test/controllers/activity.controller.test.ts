import ActivityController from "../../src/controllers/activity.controller";
import { CustomError } from "../../src/errors/custom.error";
import { ActivityDto } from "../../src/models/activity.dto";
import { activityMock } from "../../src/models/mocks/activity.mock";
import { userMock } from "../../src/models/mocks/user.mock";
import * as ActivityService from "../../src/services/activity.service";
import * as UserService from "../../src/services/user.service";

describe("ActivityController", () => {
  const controller = new ActivityController();

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getActivity", () => {
    test("SHOULD return ActivityDto WHEN getActivity succeeds", async () => {
      const activitySpy = jest.spyOn(ActivityService, 'fetchActivity').mockResolvedValueOnce(activityMock);
      const userSpy = jest.spyOn(UserService, 'getCurrentUser').mockReturnValue(userMock);

      const response = await controller.getActivity();

      expect(userSpy).toHaveBeenCalledTimes(1);
      expect(activitySpy).toHaveBeenCalledTimes(1);
      expect(activitySpy).toHaveBeenCalledWith(userMock);
      expect(response).toEqual(new ActivityDto(activityMock));
    });
    
    test("SHOULD throw error WHEN getActivity fails", async() => {
      const errorMock = new CustomError(0, "Yes, this is an actual http status code.");
      const activitySpy = jest.spyOn(ActivityService, 'fetchActivity').mockImplementationOnce(() => {throw errorMock;});

      expect(controller.getActivity()).rejects.toThrowError(errorMock);
      expect(activitySpy).toHaveBeenCalledTimes(1);
    });
  });
});