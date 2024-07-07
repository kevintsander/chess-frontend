import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastActions } from "./shared.actions";
import { delay, map, mergeMap, of } from "rxjs";

@Injectable()
export class SharedEffects {

  constructor(
    private actions$: Actions,
  ) { }

  //https://stackoverflow.com/questions/49202438/how-to-parametrize-rx-delay-function-inside-ngrx-effect
  // eat (destroy) toast after specified duration
  popToast$ = createEffect(() => this.actions$.pipe(
    ofType(ToastActions.popToast),
    mergeMap((action) => {
      return of(action).pipe(
        delay(action.toast.duration),
        map((action) => ToastActions.eatToast({ id: action.toast.id }))
      )
    })
  ));
}
