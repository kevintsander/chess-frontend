import { createReducer, on } from '@ngrx/store';
import { ActionUtil } from '../action/action.util';
import { GameState } from './game.state';
import { GameActions } from './game.actions';
import { ActionType } from '../action/action-type.enum';
import { GameStatus } from '../game-status.enum';

const initialState: GameState = {
  id: undefined,
  players: [],
  turn: null,
  current_player: null,
  status: GameStatus.Initialized,

  units: [],
  allowedActions: [],
  promoteUnitLocation: null,

  selectedLocation: null,
  selectedActionLocation: null,
  selectedPromoteUnitType: null
}

const actionUtil = new ActionUtil();

export const gameReducer = createReducer(
  initialState,
  on(GameActions.startGame, (state, { id }) => {
    return {
      ...initialState,
      id: id
    }
  }),
  on(GameActions.receiveGameData, (state, { gameData }) => {
    // keep selected location unless the turn or current player changed
    var newSelectedLocation = state.selectedLocation;
    if (gameData.turn !== state.turn || gameData.current_player !== state.current_player || gameData.status == 'promoting') {
      newSelectedLocation = null;
    }

    return {
      ...state,
      turn: gameData.turn,
      current_player: gameData.current_player,
      units: gameData.units,
      allowedActions: gameData.allowed_actions,
      promoteUnitLocation: gameData.promote_unit_location,
      selectedLocation: newSelectedLocation,
      status: gameData.status,
    }
  }),
  on(GameActions.selectUnit, (state, { location }) => {
    return {
      ...state,
      selectedLocation: location
    };
  }),
  on(GameActions.unselectUnit, (state) => {
    return {
      ...state,
      selectedLocation: null,
      selectedActionLocation: null
    }
  }),
  on(GameActions.selectActionLocation, (state, { location }) => {
    if (!state.selectedLocation) { return state; };

    return {
      ...state,
      selectedActionLocation: location
    }
  })
);
