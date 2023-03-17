import { Activity } from "./activity";
import { Accessibility } from "./enums/accessibility.enum";
import { Price } from "./enums/price.enum";

export class ActivityDto{
  activity!: string;
  accessibility!: Accessibility;
  type!: string;
  participants!: number;
  price!: Price;
  link!: string;
  key!: string;

  constructor(activity: Activity) {
    Object.assign(this, {...activity, price: this.mapPrice(activity.price), accessibility: this.mapAccessibility(activity.accessibility)});
  }

  private mapPrice(price: number): Price{
    if(price > .5) {
      return Price.High;
    }else if(price == 0) {
      return Price.Free;
    }
    return Price.Low;
  }

  private mapAccessibility(accessibility: number): Accessibility {
    if(accessibility > .75) {
      return Accessibility.Low;
    } else if(accessibility <= .25) {
      return Accessibility.High;
    }
    return Accessibility.Medium;
  }
}