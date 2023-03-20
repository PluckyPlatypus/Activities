import { Accessibility } from "./enums/accessibility.enum";
import { Price } from "./enums/price.enum";

export interface Activity{
  activity: string,
  accessibility: Accessibility,
  type: string,
  participants: number,
  price: Price,
  link: string,
  key: string,
}