import { Accessibility } from "../enums/accessibility.enum";
import { Price } from "../enums/price.enum";
import { User } from "../user";

export const userMock: User = new User();
userMock.name = "MockName";
userMock.accessibility = Accessibility.Medium;
userMock.price = Price.Free;