import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { Activity } from "../models/activity";
import { User } from "../models/user";
import { ApiService } from "../services/api.service";
import { StateService } from "../services/state.service";

@Injectable()
export class StateFacade {

  constructor(private apiService: ApiService, private stateService: StateService) { }

  isLoading$(): Observable<boolean> {
    return this.stateService.isLoading$;
  }

  activity$(): Observable<Activity | null> {
    return this.stateService.activity$;
  }

  user$(): Observable<User | null> {
    return this.stateService.user$;
  }

  errors$(): Observable<string | null> {
    return this.stateService.error$;
  }

  getActivity() {
    this.stateService.resetErrorState();
    this.stateService.setIsLoading(true);
    this.apiService.getActivity().pipe(finalize(() => {
      this.stateService.setIsLoading(false);
    })).subscribe({
      next: (activity) => this.stateService.setActivity(activity),
      error: (e: HttpErrorResponse ) => this.stateService.setError(this.parseError(e)),
    });
  }

  updateUser(newUser: User) {
    this.stateService.resetErrorState();
    this.stateService.setIsLoading(true);
    this.apiService.postUser(newUser).pipe(finalize(() => {
      this.stateService.setIsLoading(false);
    })).subscribe({
      next: () => this.stateService.setUser(newUser),
      error: (e) => this.stateService.setError(this.parseError(e)),
    });
  }

  parseError(error: HttpErrorResponse): string {
    // for custom error: remove all line breaks caused by validation errors
    const errorText = typeof(error.error) === "string" ? error.error.toString().replaceAll("/n", "") : JSON.stringify(error.error);
    const errorMessage = `Oh no! Something went wrong here. We got the following error: ${error.message} ${errorText}`;
    return errorMessage;
  }
}