import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Store } from "@ngrx/store"
import { GameActions } from "./game.actions";
import { filter, map, switchMap, tap, withLatestFrom } from "rxjs";
import { GameDataService } from "../game-data.service";
import { GameData } from "../game-data.model";
import { selectMustPromote, selectSelectedActionWithId } from "./game.selector";

@Injectable()
export class GameEffects {

  constructor(
    private actions$: Actions,
    private gameDataService: GameDataService,
    private store: Store<GameData>
  ) { }

  startGame$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.startGame),
    switchMap((action) => {
      return this.gameDataService.getGame$(action.id).pipe(
        map((game) => GameActions.loadGameData({ gameData: game }))
      )
    })
  ));

  selectActionLocation$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.selectActionLocation),
    withLatestFrom(this.store.select(selectMustPromote)),
    filter(([action, mustPromote]) => !mustPromote),
    map(([action, mustPromote]) => GameActions.endAction())
  ));

  endAction$ = createEffect(() => this.actions$.pipe(
    ofType(GameActions.endAction),
    withLatestFrom(this.store.select(selectSelectedActionWithId)),
    filter(([userAction, boardAction]) => boardAction?.id != null),
    tap(([userAction, boardAction]) => {
      this.gameDataService.performAction(boardAction.id!, boardAction.selectedLocation!, boardAction.selectedActionLocation!);
    })
  ),
    { dispatch: false });
}
