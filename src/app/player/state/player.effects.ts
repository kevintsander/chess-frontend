import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Store } from "@ngrx/store"
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { PlayerState } from "./player.state";
import { PlayerActions } from "./player.actions";
import { UserState } from "src/app/user/state/user.state";
import { selectUser } from "src/app/user/state/user.selector";
import { GameDataService } from "src/app/game/game-data.service";
import { GameData } from "src/app/game/game-data.model";
import { selectGameId } from "src/app/game/state/game.selector";

@Injectable()
export class PlayerEffects {

  constructor(
    private actions$: Actions,
    private playerStore: Store<PlayerState>,
    private userStore: Store<UserState>,
    private gameStore: Store<GameData>,
    private gameDataService: GameDataService
  ) { }

  startSetPlayer1$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.startSetPlayer1),
    withLatestFrom(this.userStore.select(selectUser)),
    map(([_startSetPlayer1Action, user]) => {
      if (user) {
        return PlayerActions.setPlayer1({ id: user.id });
      }
      else {
        return PlayerActions.showPlayer1Login();
      }
    })
  ));

  startSetPlayer2$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.startSetPlayer2),
    withLatestFrom(this.userStore.select(selectUser)),
    map(([_startSetPlayer2Action, user]) => {
      if (user) {
        return PlayerActions.setPlayer2({ id: user.id });
      }
      else {
        return PlayerActions.showPlayer2Login();
      }
    })
  ));

  // TODO -- can we have one event for each player and pass in number as props?
  setPlayer1$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.setPlayer1),
    withLatestFrom(this.gameStore.select(selectGameId)),
    filter(([action, gameId]) => gameId != null),
    switchMap(([action, gameId]) => {
      return this.gameDataService.setPlayer$(gameId!, action.id, 1).pipe(
        // tap((res) => console.log(res)),
        map(() => PlayerActions.setPlayer1Success()),
        catchError((error) => of(PlayerActions.setPlayer1Error(error)))
      )
    })
  ));

  setPlayer2$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.setPlayer2),
    withLatestFrom(this.gameStore.select(selectGameId)),
    filter(([action, gameId]) => gameId != null),
    switchMap(([action, gameId]) => {
      return this.gameDataService.setPlayer$(gameId!, action.id, 2).pipe(
        map(() => PlayerActions.setPlayer2Success()),
        catchError((error) => of(PlayerActions.setPlayer2Error(error)))
      )
    })
  ));

}
