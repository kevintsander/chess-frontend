import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { GameData } from '../game-data.model';

export const GameActions = createActionGroup({
  source: 'Game',
  events: {
    'Create Game': emptyProps(),
    'Start Game': props<{ id: string }>(),
    'Load Game Data': props<{ gameData: GameData }>(),
    'Select Unit': props<{ location: string }>(),
    'Unselect Unit': emptyProps(),
    'Select Action Location': props<{ location: string }>(),
    'Select Promoted Unit Type': props<{ unitType: string }>(),
    'End Action': emptyProps()
  }
});
