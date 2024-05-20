import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserActions } from "./user.actions";
import { EMPTY, catchError, exhaustMap, filter, iif, map, mergeMap, of } from "rxjs";
import { User } from "../../user/user.model";
import { AngularTokenService, RegisterData } from "@kevintsander/angular-token";
import { PlayerActions } from "../game/game.actions";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private tokenService: AngularTokenService
  ) { }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login),
    exhaustMap(action => {
      return this.tokenService.signIn({ login: action.email, password: action.password }).pipe(
        map((response) => {
          if (response.data) {
            const user: User = {
              id: response.data.id,
              email: response.data.email,
              nickname: response.data.nickname
            }

            return UserActions.loginSuccess({ user, setPlayerOnLogin: action.setPlayerOnLogin });
          }
          else { return UserActions.loginFailure({ error: "No user data in login response" }) }
        }),
        catchError((error) => of(UserActions.loginFailure({ error })))
      )
    })
  ));

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loginSuccess),
      filter(action => [1, 2].includes(action.setPlayerOnLogin ?? 0)),
      map(action => PlayerActions.setPlayer({ playerNum: action.setPlayerOnLogin!, id: action.user.id }))
    )
  }
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.logout),
    exhaustMap(() => this.tokenService.signOut())
  ), { dispatch: false });

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.signUp),
    exhaustMap(action => {
      return this.tokenService.registerAccount({ login: action.email, nickname: action.nickname, password: action.password, passwordConfirmation: action.password }).pipe(
        map((response) => {
          if (response.data) {
            const user: User = {
              id: response.data.id,
              email: response.data.email,
              nickname: response.data.nickname
            }

            return UserActions.signUpSuccess({ user });
          }
          else { return UserActions.signUpFailure({ error: "No user data in login response" }) }
        }),
        catchError((error) => of(UserActions.signUpFailure({ error })))
      )
    })
  ));


}
