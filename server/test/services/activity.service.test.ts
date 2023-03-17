import axios from "axios";
import { activityMock } from "../../src/models/mocks/activity.mock";
import { userMock } from "../../src/models/mocks/user.mock";
import { fetchActivity } from "../../src/services/activity.service";

describe("ActivityService", () => {
  describe("fetchActivity", () => {

    const path = "http://www.boredapi.com/api/activity/";

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("SHOULD fetch activity without query parameters WHEN no user is provided", async () => {
      const axiosResponse = createMockResponse(200, activityMock);
      const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse);

      const response = await fetchActivity(undefined);

      expect(axiosSpy).toHaveBeenCalledTimes(1);
      expect(axiosSpy).toHaveBeenCalledWith(path, {"params": {}});
      expect(response).toEqual(activityMock);
    });

    test("SHOULD fetch activity with query parameters WHEN user is provided", async () => {
      const axiosResponse = createMockResponse(200, activityMock);
      const accessibilityRange = userMock.getAccessibility();
      const priceRange = userMock.getPrice();
      const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse);

      const response = await fetchActivity(userMock);

      expect(axiosSpy).toHaveBeenCalledTimes(1);
      expect(axiosSpy).toHaveBeenCalledWith(path, {"params": {
        "maxaccessibility": accessibilityRange.max, "maxprice": 
            priceRange.max, "minaccessibility": accessibilityRange.min, "minprice": priceRange.min}});
      expect(response).toEqual(activityMock);
    });

    test("SHOULD throw WHEN call to external API fails", async () => {
      const axiosResponse = createMockResponse(408, {});
      const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse);

      await expect(fetchActivity(undefined)).rejects.toThrow();
      expect(axiosSpy).toHaveBeenCalledTimes(1);
    });

    test("SHOULD throw WHEN external API sends unexpected format", async() => {
      const invalidActivity = {
        name: "invalid activity",
      };
      const axiosResponse = createMockResponse(200, invalidActivity);
      const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse);

      await expect(fetchActivity(undefined)).rejects.toThrow();
      expect(axiosSpy).toHaveBeenCalledTimes(1);
    });

    function createMockResponse<T>(statusCode: number, data: T){
      return {
        status: statusCode,
        statusText: "",
        data,
      };
    }
  });
});