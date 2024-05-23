import { createReducer, on } from '@ngrx/store';
import { GameState } from './game.state';
import { GameActions, PlayerActions } from './game.actions';
import { GameStatus } from '../../game/game-status.enum';

const initialState: GameState = {
  id: undefined,

  player1: null,
  player2: null,

  turn: null,
  current_color: null,
  status: GameStatus.Initialized,

  units: [],
  allowedActions: [],
  promoteUnitLocation: null,

  selectedLocation: null,
  selectedActionLocation: null,
  selectedPromoteUnitType: null
}

export const gameReducer = createReducer(
  initialState,

  on(GameActions.subscribeGame, (state, { id }) => {
    return {
      ...state,
      id: id
    }
  }),

  on(GameActions.receiveGameData, (state, { gameData }) => {
    // keep selected location unless the turn or current player changed
    var newSelectedLocation = state.selectedLocation;
    if (gameData.turn !== state.turn || gameData.current_color !== state.current_color || gameData.status == 'promoting') {
      newSelectedLocation = null;
    }

    return {
      ...state,
      player1: gameData.player1,
      player2: gameData.player2,
      turn: gameData.turn,
      current_color: gameData.current_color,
      units: gameData.units,
      allowedActions: gameData.allowed_actions,
      promoteUnitLocation: gameData.promote_unit_location,
      selectedLocation: newSelectedLocation,
      status: gameData.status,
    }
  }),

  on(GameActions.clearGame, (state) => {
    return {
      ...initialState
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
  }),

  on(PlayerActions.setPlayer, (state) => {
    return {
      ...state,
      showPlayerNumLogin: null
    }
  })

);
