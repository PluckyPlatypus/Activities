import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { StateFacade } from "src/app/shared/facades/state.facade";
import { Accessibility } from "src/app/shared/models/enums/accessibility.enum";
import { Price } from "src/app/shared/models/enums/price.enum";
import { User } from "src/app/shared/models/user";

interface UserForm {
  name: FormControl<string>;
  accessibility: FormControl<Accessibility | null>;
  price: FormControl<Price | null>;
}


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent{
  user$: Observable<User | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  form: FormGroup;

  accessibilityValues = Object.values(Accessibility);
  priceValues = Object.values(Price);

  constructor(private stateFacade: StateFacade){
    // TODO: update function names!
    this.user$ = stateFacade.user$();
    this.isLoading$ = stateFacade.isLoading$();
    this.error$ = stateFacade.errors$();

    this.form = new FormGroup<UserForm>({
      name: new FormControl('', {nonNullable: true}),
      accessibility: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required])
    });
  }

  updateUser() {
    const testUser: User = {
      name: this.form.value.name,
      accessibility: this.form.value.accessibility,
      price: this.form.value.price
    };
    this.stateFacade.updateUser(testUser);
  }
}