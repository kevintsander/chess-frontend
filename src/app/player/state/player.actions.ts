import { createActionGroup, props, emptyProps } from '@ngrx/store';

export const PlayerActions = createActionGroup({
  source: 'Player',
  events: {
    'Show Player 1 Login': emptyProps(),
    'Show Player 2 Login': emptyProps(),
    'Set Player 1': emptyProps(),
    'Set Player 2': emptyProps()
  }
});
