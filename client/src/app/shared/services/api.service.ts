import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Activity } from "../models/activity";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseURL = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  getActivity(): Observable<Activity> {    
    return this.http.get<Activity>(this.baseURL + "activity");
  }

  postUser(user: User): Observable<unknown> {
    return this.http.post(this.baseURL + "user", user);
  }
}