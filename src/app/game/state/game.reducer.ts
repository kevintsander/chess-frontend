import { createReducer, on } from '@ngrx/store';
import { ActionUtil } from '../action/action.util';
import { GameState } from './game.state';
import { GameActions } from './game.actions';
import { ActionType } from '../action/action-type.enum';

const initialState: GameState = {
  id: undefined,
  players: [],
  turn: null,
  current_player: null,

  units: [],
  allowedActions: [],

  selectedLocation: null,
  selectedActionLocation: null,

  mustPromote: false,
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
  on(GameActions.loadGameData, (state, { gameData }) => {
    // keep selected location unless the turn or current player changed
    var newSelectedLocation = state.selectedLocation;
    if (gameData.turn !== state.turn || gameData.current_player !== state.current_player) {
      newSelectedLocation = null;
    }

    return {
      ...state,
      turn: gameData.turn,
      current_player: gameData.current_player,
      units: gameData.units,
      allowedActions: gameData.allowed_actions,
      selectedLocation: newSelectedLocation
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

    // check for promotable unit
    var selectedUnit = actionUtil.getLocationUnit(state.selectedLocation, state.units);
    if (!selectedUnit) { return state; }
    var mustPromote = false;
    if (selectedUnit.type === 'Pawn') {
      if (selectedUnit.player === 'white' && location.substring(1) === '8') {
        mustPromote = true;
      }
      else if (selectedUnit.player === 'black' && location.substring(1) === '1') {
        mustPromote = true;
      }
    }

    return {
      ...state,
      selectedActionLocation: location,
      mustPromote: mustPromote
    }
  })
);
