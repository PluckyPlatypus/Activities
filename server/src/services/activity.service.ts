import axios from "axios";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CustomError } from "../errors/custom.error";
import { Activity } from "../models/activity";
import { User } from "../models/user";

export async function fetchActivity(currentUser: User | undefined): Promise<Activity> {
  const priceRange = currentUser?.getPrice();
  const accessibilityRange = currentUser?.getAccessibility();

  const params = {
    ...(priceRange && { minprice: priceRange.min, maxprice: priceRange.max }),
    ...(accessibilityRange && { minaccessibility: accessibilityRange.min, maxaccessibility: accessibilityRange.max })
  };

  const response = await axios.get("http://www.boredapi.com/api/activity/", { 
    params: params
  });

  if(response.status < 200 || response.status > 299) {
    throw new CustomError(response.status, `Could not fetch a new random activitiy. ${response.statusText}`);
  }
    
  const randomActivity = plainToClass(Activity, response.data);
  const validationErrors = await validate(randomActivity);

  if(validationErrors.length > 0) {
    throw new CustomError(500, `Invalid activity received! ${validationErrors.map(ve => ve.toString(false, false, "", true)).join(" ")}`);
  }
  return randomActivity;
}