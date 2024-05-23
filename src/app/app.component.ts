import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from './state/user/user.state';
import { AngularTokenService, UserData } from '@kevintsander/angular-token';
import { Observable, Subscription } from 'rxjs';
import { UserActions } from './state/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chess-engine';
  showLogin$!: Observable<boolean>;
  showSignUp$!: Observable<boolean>;
  private userDataSub!: Subscription;
  private validateTokenSub!: Subscription;

  constructor(private userStore: Store<UserState>, private tokenService: AngularTokenService) { }

  ngOnInit(): void {
    this.setValidateTokenSub();
    this.setUserDataSub();
  }

  setValidateTokenSub(): void {
    if (this.tokenService.userSignedIn()) {
      this.validateTokenSub = this.tokenService.validateToken().subscribe((result) => console.log(result));
    }
  }

  setUserDataSub(): void {
    this.userDataSub = this.tokenService.userData.subscribe((user) => {
      this.userStore.dispatch(UserActions.setCurrentUser({ user: user != null ? { id: user.id, email: user.email, nickname: user.nickname } : null }))
    });
  }

  ngOnDestroy(): void {
    this.userDataSub?.unsubscribe();
    this.validateTokenSub?.unsubscribe();
  }

}
