import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserState } from '../state/user.state';
import { Store } from '@ngrx/store';
import { UserActions } from '../state/user.actions';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup<any>;

  constructor(private userStore: Store<UserState>) { }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  onSubmit() {
    this.userStore.dispatch(UserActions.login({ ...this.loginFormGroup.value }))
  }

  onClose() {
    this.userStore.dispatch(UserActions.hideLogin())
  }

}
