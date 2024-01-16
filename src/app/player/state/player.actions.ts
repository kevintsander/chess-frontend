import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { empty } from 'rxjs';

export const PlayerActions = createActionGroup({
  source: 'Player',
  events: {
    'Start Set Player 1': emptyProps(),
    'Start Set Player 2': emptyProps(),
    'Show Player 1 Login': emptyProps(),
    'Show Player 2 Login': emptyProps(),
    'Set Player 1': props<{ id: number }>(),
    'Set Player 2': props<{ id: number }>(),
    'Set Player 1 Success': emptyProps(),
    'Set Player 2 Success': emptyProps(),
    'Set Player 1 Error': props<{ error: string }>(),
    'Set Player 2 Error': props<{ error: string }>()
  }
});
