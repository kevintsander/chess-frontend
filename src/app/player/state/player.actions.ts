import { createActionGroup, props, emptyProps } from '@ngrx/store';

export const PlayerActions = createActionGroup({
  source: 'Player',
  events: {
    'Start Set Player 1': emptyProps(),
    'Show Player 1 Login': emptyProps(),
    'Set Player 1': emptyProps(),
    'Start Set Player 2': emptyProps(),
    'Show Player 2 Login': emptyProps(),
    'Set Player 2': emptyProps()
  }
});
