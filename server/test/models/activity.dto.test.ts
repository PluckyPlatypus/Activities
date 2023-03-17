import { ActivityDto } from "../../src/models/activity.dto";
import { Accessibility } from "../../src/models/enums/accessibility.enum";
import { Price } from "../../src/models/enums/price.enum";
import { activityMock } from "../../src/models/mocks/activity.mock";

describe("ActivityDto", () => {
  describe("Price", () => {
    [
      {value: 0.0, expected: Price.Free},
      {value: 0.1, expected: Price.Low},
      {value: (1/3), expected: Price.Low},
      {value: 0.5, expected: Price.Low},
      {value: 0.75, expected: Price.High},
      {value: 1.0, expected: Price.High},
    ].forEach(testData => {
      test(`SHOULD map price ${testData.value} to ${testData.expected}`, () => {
        const activity = {...activityMock, price: testData.value};
  
        const result = new ActivityDto(activity);
  
        expect(result.price).toBe(testData.expected);
      });
    });
  });

  describe("Accessibility", () => {
    [
      {value: 0.0, expected: Accessibility.High},
      {value: 0.1, expected: Accessibility.High},
      {value: 0.25, expected: Accessibility.High},
      {value: (1/3), expected: Accessibility.Medium},
      {value: .5, expected: Accessibility.Medium},
      {value: .75, expected: Accessibility.Medium},
      {value: .751, expected: Accessibility.Low},
      {value: .9999, expected: Accessibility.Low},
      {value: 1.0, expected: Accessibility.Low},
    ].forEach(testData => {
      test(`SHOULD map accessibility ${testData.value} to ${testData.expected}`, () => {
        const activity = {...activityMock, accessibility: testData.value};
  
        const result = new ActivityDto(activity);
  
        expect(result.accessibility).toBe(testData.expected);
      });
    });
  });
});