import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Store } from "@ngrx/store"
import { map, withLatestFrom } from "rxjs";
import { PlayerState } from "./player.state";
import { PlayerActions } from "./player.actions";
import { UserState } from "src/app/user/state/user.state";
import { selectUser } from "src/app/user/state/user.selector";

@Injectable()
export class PlayerEffects {

  constructor(
    private actions$: Actions,
    private playerStore: Store<PlayerState>,
    private userStore: Store<UserState>
  ) { }

  startSetPlayer1$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.startSetPlayer1),
    withLatestFrom(this.userStore.select(selectUser)),
    map(([_startSetPlayer1Action, user]) => {
      if (user) {
        return PlayerActions.setPlayer1();
      }
      else {
        return PlayerActions.showPlayer1Login();
      }
    })
  ));

  startSetPlayer2$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.startSetPlayer2),
    withLatestFrom(this.userStore.select(selectUser)),
    map(([_startSetPlayer1Action, user]) => {
      if (user) {
        return PlayerActions.setPlayer2();
      }
      else {
        return PlayerActions.showPlayer2Login();
      }
    })
  ));

}
