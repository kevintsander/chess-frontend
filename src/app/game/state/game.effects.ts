import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Store } from "@ngrx/store"
import { GameActions } from "./game.actions";
import { filter, map, switchMap, tap, withLatestFrom } from "rxjs";
import { GameDataService } from "../game-data.service";
import { GameData } from "../game-data.model";
import { selectGameId, selectSelectedActionWithId } from "./game.selector";

@Injectable()
export class GameEffects {

  constructor(
    private actions$: Actions,
    private gameDataService: GameDataService,
    private store: Store<GameData>
  ) { }

  createGame$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.createGame),
    switchMap((_action) =>
      this.gameDataService.createGame$().pipe(
        map((id) => GameActions.startGame({ id: id }))
      )
    )
  ));

  startGame$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.startGame),
    switchMap((action) =>
      this.gameDataService.getGame$(action.id).pipe(
        map((game) => GameActions.receiveGameData({ gameData: game }))
      )
    )
  ));

  selectActionLocation$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.selectActionLocation),
    map(() => GameActions.endAction())
  ));

  endAction$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.endAction),
    withLatestFrom(this.store.select(selectSelectedActionWithId)),
    filter(([userAction, boardAction]) => boardAction?.id != null),
    tap(([userAction, boardAction]) => {
      this.gameDataService.performAction(boardAction.id!, boardAction.selectedLocation!, boardAction.selectedActionLocation!);
    })
  ),
    { dispatch: false }
  );

  promoteUnit$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.promoteUnit),
    withLatestFrom(this.store.select(selectGameId)),
    tap(([promoteUnit, gameId]) => {
      this.gameDataService.performPromotion(gameId!, promoteUnit.unitType);
    })
  ),
    { dispatch: false }
  );
}
