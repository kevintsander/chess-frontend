import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { GameData } from '../../data/game/game-data.model';

export const GameActions = createActionGroup({
  source: 'Game',
  events: {
    'Create Game': emptyProps(),
    'Subscribe Game': props<{ id: string }>(),
    'Receive Game Data': props<{ gameData: GameData }>(),
    'Select Unit': props<{ location: string }>(),
    'Unselect Unit': emptyProps(),
    'Select Action Location': props<{ location: string }>(),
    'Promote Unit': props<{ unitType: string }>(),
    'End Action': emptyProps(),
    'Clear Game': emptyProps()
  }
});

export const PlayerActions = createActionGroup({
  source: 'Player',
  events: {
    'Start Set Player': props<{ playerNum: number }>(),
    'Show Player Login': props<{ playerNum: number }>(),
    'Set Player': props<{ playerNum: number, id: number }>(),
    'Set Player Success': props<{ playerNum: number }>(),
    'Set Player Error': props<{ error: string }>(),
  }
});
