import { User } from "../models/user";

let currentUser: User | undefined = undefined;

export function setCurrentUser(newUser: User | undefined) {
  currentUser = newUser;
}

export function getCurrentUser(): User | undefined {
  return currentUser;
}