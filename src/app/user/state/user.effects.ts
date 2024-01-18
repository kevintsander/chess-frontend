import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserActions } from "./user.actions";
import { EMPTY, catchError, exhaustMap, filter, map, of, switchMap, withLatestFrom } from "rxjs";
import { User } from "../user.model";
import { GameDataService } from "src/app/game/game-data.service";
import { AngularTokenService } from "@kevintsander/angular-token";
import { UserState } from "./user.state";
import { Store } from "@ngrx/store";
import { selectSetPlayerOnLogin, selectUser, selectUserState } from "./user.selector";
import { PlayerActions } from "src/app/player/state/player.actions";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private tokenService: AngularTokenService,
    private userStore: Store<UserState>
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

            return UserActions.loginSuccess({ user });
          }
          else { return UserActions.loginFailure({ error: "No user data in login response" }) }
        }),
        catchError((error) => of(UserActions.loginFailure({ error })))
      )
    })
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loginSuccess),
    withLatestFrom(this.userStore.select(selectUserState)),
    filter(([action, userState]) => userState.setPlayerOnLogin != null && [1, 2].includes(userState.setPlayerOnLogin)),
    map(([action, userState]) => {
      if (userState.setPlayerOnLogin === 1) {
        return PlayerActions.setPlayer1({ id: action.user.id });
      }
      else {
        return PlayerActions.setPlayer2({ id: action.user.id });
      }
    })
  ));

}
