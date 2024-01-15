import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserActions } from "./user.actions";
import { exhaustMap, map, of, switchMap } from "rxjs";
import { User } from "../user.model";
import { GameDataService } from "src/app/game/game-data.service";
import { AngularTokenService } from "@kevintsander/angular-token";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private tokenService: AngularTokenService
  ) { }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.login),
    switchMap(action => {
      console.log(action.email)
      console.log(action.password)
      return this.tokenService.signIn({ login: action.email, password: action.password }).pipe(
        map((response) => {
          console.log(response)
          const user: User = {
            userId: response.data!.id,
            email: response.data!.email,
            nickname: response.data!.nickname
          }

          return UserActions.loginSuccess({ user })
        })
      )
    })
  ));
}
