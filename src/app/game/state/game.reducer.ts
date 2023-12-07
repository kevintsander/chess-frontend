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
  hoverLocation: null,

  selectableLocations: [],
  movableLocations: [],
  attackableLocations: [],
  enPassantableLocation: null,
  otherCastleUnitLocation: null,

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
    return {
      ...state,
      turn: gameData.turn,
      current_player: gameData.current_player,
      units: gameData.units,
      allowedActions: gameData.allowed_actions,

      selectableLocations: actionUtil.getSelectableLocations(gameData.allowed_actions)
    }
  }),
  on(GameActions.selectUnit, (state, { location }) => {
    var unitActions = actionUtil.getUnitActions(location, state.allowedActions);
    return {
      ...state,
      selectedLocation: location,
      hoverLocation: null,
      movableLocations: actionUtil.getMovableLocations(unitActions),
      attackableLocations: actionUtil.getAttackableLocations(unitActions),
      enPassantableLocation: null,
      otherCastleUnitLocation: null,
      mustPromote: false,
      selectedPromoteUnitType: null
    };
  }),
  on(GameActions.unselectUnit, (state) => {
    return {
      ...initialState,
      units: state.units,
      allowedActions: state.allowedActions
    }
  }),
  on(GameActions.hoverLocation, (state, { location }) => {
    if (!state.selectedLocation) return { ...state }; // don't allow hover if nothing is selected

    if (!state.movableLocations?.includes(location) && !state.attackableLocations?.includes(location)) {
      return state;
    }
    const locationAction = actionUtil.getLocationAction(location, actionUtil.getUnitActions(location, state.allowedActions));
    if (!locationAction) return state;

    var enPassantableLocation: string | null = null;
    var otherCastleUnitLocation: string | null = null;
    if (locationAction.type = ActionType.EnPassant) {
      enPassantableLocation = locationAction.capture_unit!;
    }
    else if ([ActionType.KingsideCastle, ActionType.QueensideCastle].includes(locationAction.type)) {
      otherCastleUnitLocation = actionUtil.getOtherCastleUnitLocation(location, locationAction);
    }
    return {
      ...state,
      hoverLocation: location,
      enPassantableLocation: enPassantableLocation,
      otherCastleUnitLocation: otherCastleUnitLocation
    }
  }),
  on(GameActions.selectActionLocation, (state, { location }) => {
    if (!state.selectedLocation) return { ...state };
    // check for promotable unit
    var mustPromote = false;
    var selectedUnit = actionUtil.getLocationUnit(state.selectedLocation, state.units);
    if (selectedUnit!.type === 'Pawn') {
      if (selectedUnit!.player === 'white' && location.substring(1) === '8') {
        mustPromote = true;
      }
      else if (selectedUnit!.player === 'black' && location.substring(1) === '1') {
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
