import { Accessibility } from "../../src/models/enums/accessibility.enum";
import { Price } from "../../src/models/enums/price.enum";
import { userMock } from "../../src/models/mocks/user.mock";
import { QueryRange } from "../../src/models/queryrange";

describe("User", () => {
  describe("getPrice", () => {
    [
      {value: Price.Free, expected: new QueryRange(0, 0)},
      {value: Price.Low, expected: new QueryRange(0.001, 0.5)},
      {value: Price.High, expected: new QueryRange(0.501, 1.0)},
    ].forEach(testData => {
      test(`SHOULD map price ${testData.value} to range [${testData.expected.min}, ${testData.expected.max}]`, () => {
        const user = userMock;
        user.price = testData.value;
        
        const result = user.getPrice();
        
        expect(result).toEqual(testData.expected);
      });
    });
  });

  describe("getAccessibility", () => {
    [
      {value: Accessibility.High, expected: new QueryRange(0, .25)},
      {value: Accessibility.Medium, expected: new QueryRange(0.251, 0.75)},
      {value: Accessibility.Low, expected: new QueryRange(0.751, 1.0)},
    ].forEach(testData => {
      test(`SHOULD map accessibility ${testData.value} to range [${testData.expected.min}, ${testData.expected.max}]`, () => {
        const user = userMock;
        user.accessibility = testData.value;
          
        const result = user.getAccessibility();
          
        expect(result).toEqual(testData.expected);
      });
    });
  });
});