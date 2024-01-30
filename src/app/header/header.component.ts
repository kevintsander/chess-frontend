import { Component, OnInit } from '@angular/core';
import { UserState } from '../user/state/user.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '../user/state/user.selector';
import { User } from '../user/user.model';
import { CommonModule } from '@angular/common';
import { UserActions } from '../user/state/user.actions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private userStore: Store<UserState>) { }

  ngOnInit(): void {
    this.user$ = this.userStore.select(selectUser);
  }

  logoutClick(): void {
    this.userStore.dispatch(UserActions.logout());
  }

  loginClick(): void {
    this.userStore.dispatch(UserActions.showLogin({ setPlayerOnLogin: null }))
  }

  signUpClick(): void {
    this.userStore.dispatch(UserActions.showSignUp());
  }
}
