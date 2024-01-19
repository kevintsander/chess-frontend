import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserState } from '../state/user.state';
import { Store } from '@ngrx/store';
import { UserActions } from '../state/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() playerNum: number | null = null;
  loginFormGroup!: FormGroup<any>;

  constructor(private userStore: Store<UserState>) { }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  onSubmit() {
    this.userStore.dispatch(UserActions.login({ ...this.loginFormGroup.value, setPlayerOnLogin: this.playerNum }))
  }

}
