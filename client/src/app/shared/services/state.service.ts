import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Activity } from '../models/activity';
import { User } from '../models/user';

interface AppState {
    currentUser: User | null;
    currentActivity: Activity | null;
    currentError: string | null;
    isLoading: boolean;
  }

const initialState: AppState = {
  currentUser: null,
  currentActivity: null,
  currentError: null,
  isLoading: false,
};

  @Injectable({ providedIn: 'root'})
export class StateService{
  // TODO: this is not very elegant - defined here and used right underneath - maybe move all into constructor? 
  private state$: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(initialState);
  
  user$: Observable<User | null> = this.select(state => state.currentUser);
  activity$: Observable<Activity | null> = this.select(state => state.currentActivity);
  error$: Observable<string | null> = this.select(state => state.currentError);
  isLoading$: Observable<boolean> = this.select(state => state.isLoading);

  private get state(): AppState {
    return this.state$.getValue();
  }

  setActivity(activity: Activity) {
    this.setState({currentActivity: activity});
  }

  setUser(user: User) {
    this.setState({currentUser: user});
  }

  setError(error: string) {
    this.setState({ currentError: error });
  }
  
  resetErrorState() {
    this.setState({ currentError: undefined });
  }
  
  setIsLoading(state: boolean) {
    this.setState({ isLoading: state });
  }

  private select<K>(mapFn: (state: AppState) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: AppState) => mapFn(state)),
      distinctUntilChanged()
    );
  }
    
  private setState(newState: Partial<AppState>) {
    this.state$.next({
      ...this.state,
      ...newState,
    });
  }
}