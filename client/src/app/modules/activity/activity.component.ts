import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { StateFacade } from "src/app/shared/facades/state.facade";
import { Activity } from "src/app/shared/models/activity";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent{
  activity$: Observable<Activity | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;


  constructor(private stateFacade: StateFacade){
    this.activity$ = stateFacade.activity$();
    this.isLoading$ = stateFacade.isLoading$();
    this.error$ = stateFacade.errors$();
  }

  getNewActivity() {
    this.stateFacade.getActivity();
  }
}