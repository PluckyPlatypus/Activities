import { Accessibility } from "./enums/accessibility.enum";
import { Price } from "./enums/price.enum";

export interface User {
    name: string,
    accessibility: Accessibility,
    price: Price;
}