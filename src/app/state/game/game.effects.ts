import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Store } from "@ngrx/store"
import { GameActions, PlayerActions } from "./game.actions";
import { catchError, filter, map, of, repeat, switchMap, takeUntil, tap, withLatestFrom } from "rxjs";
import { GameDataService } from "../../game/game-data.service";
import { selectGameId, selectSelectedActionWithId } from "./game.selector";
import { GameState } from "./game.state";
import { Router } from "@angular/router";

@Injectable()
export class GameEffects {

  constructor(
    private actions$: Actions,
    private gameDataService: GameDataService,
    private gameStore: Store<GameState>,
    private router: Router
  ) { }

  createGame$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.createGame),
    switchMap((_action) =>
      this.gameDataService.createGame$().pipe(
        tap((id) => this.router.navigate(['/games', id]))
      )
    )
  ),
    { dispatch: false }
  );

  startGame$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.subscribeGame),
    switchMap((action) =>
      this.gameDataService.getGameData$(action.id).pipe(
        map((game) => GameActions.receiveGameData({ gameData: game })),
        takeUntil(
          this.actions$.pipe(
            ofType(GameActions.clearGame)
          )
        ),
        repeat({
          delay: () => this.actions$.pipe(
            ofType(GameActions.subscribeGame)
          )
        })
      )
    )
  ));

  selectActionLocation$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.selectActionLocation),
    map(() => GameActions.endAction())
  ));

  endAction$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.endAction),
    withLatestFrom(this.gameStore.select(selectSelectedActionWithId)),
    filter(([userAction, boardAction]) => boardAction?.id != null),
    tap(([userAction, boardAction]) => {
      this.gameDataService.performAction(boardAction.id!, boardAction.selectedLocation!, boardAction.selectedActionLocation!);
    })
  ),
    { dispatch: false }
  );

  promoteUnit$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.promoteUnit),
    withLatestFrom(this.gameStore.select(selectGameId)),
    tap(([promoteUnit, gameId]) => {
      this.gameDataService.performPromotion(gameId!, promoteUnit.unitType);
    })
  ),
    { dispatch: false }
  );

  // TODO -- can we have one event for each player and pass in number as props?
  setPlayer$ = createEffect(() => this.actions$.pipe(
    ofType(PlayerActions.setPlayer),
    withLatestFrom(this.gameStore.select(selectGameId)),
    filter(([setPlayerAction, gameId]) => gameId != null),
    switchMap(([setPlayerAction, gameId]) => {
      return this.gameDataService.setPlayer$(gameId!, setPlayerAction.id, setPlayerAction.playerNum).pipe(
        map(() => PlayerActions.setPlayerSuccess({ playerNum: setPlayerAction.playerNum })),
        catchError((error) => of(PlayerActions.setPlayerError(error)))
      )
    })
  ));

}
