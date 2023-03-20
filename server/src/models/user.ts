import { Accessibility } from "./enums/accessibility.enum";
import { Price } from "./enums/price.enum";
import {
  Length,
  IsEnum,
} from 'class-validator';
import { QueryRange } from "./queryrange";

export class User {
    @Length(1, undefined, {message: 'User needs a name with at least one character.'})
      name!: string;

    @IsEnum(Accessibility, {message: 'User needs an accessibility preference. Possible values: "Low", "Medium" or "High".'})
      accessibility!: Accessibility;

    @IsEnum(Price, {message: 'User needs a price preference. Possible values: "Free", "Low" or "High".'})
      price!: Price;

    getPrice(): QueryRange {
      if (this.price == Price.Free) {
        return new QueryRange(0, 0);
      } else if (this.price == Price.Low) {
        return new QueryRange(0.001, .5);
      }
      return new QueryRange(.501, 1.0);
    }

    getAccessibility(): QueryRange {
      switch(this.accessibility){
        case Accessibility.High:
          return new QueryRange(0, .25);
        case Accessibility.Medium:
          return new QueryRange(.251, 0.75);
        case Accessibility.Low:
          return new QueryRange(.751, 1.0);
      }
      
    }
}