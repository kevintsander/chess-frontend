import { createReducer, on } from '@ngrx/store';

import * as UserActions from './user-board.action';
import { ActionType } from '../action/action.model';
import { ActionUtil } from '../action/action.util';
import { BoardUserState } from './user-board.state';

const initialState: BoardUserState = {
  allowedActions: [],
  hoverLocation: null,
  selected: null,
  selectableLocations: [],
  movableLocations: [],
  attackableLocations: [],
  enPassantableLocation: null,
  otherCastleUnitLocation: null
}

const actionUtil = new ActionUtil();

export const boardUserReducer = createReducer(
  initialState,
  on(UserActions.startTurn, (state, { allowedActions }) => {
    return {
      ...initialState,
      selectableLocations: actionUtil.getSelectableLocations(allowedActions)
    }
  }),
  on(UserActions.selectUnit, (state, { location, actions }) => {
    return {
      ...state,
      selectedLocation: location,
      hoverLocation: null,
      movableLocations: actionUtil.getMovableLocations(actions),
      attackableLocations: actionUtil.getAttackableLocations(actions),
      enPassantableLocation: null,
      otherCastleUnitLocation: null
    };
  }),
  on(UserActions.unselectUnit, (state, { allowedActions }) => {
    return {
      ...initialState,
      selectableLocations: actionUtil.getSelectableLocations(allowedActions)
    }
  }),
  on(UserActions.hoverLocation, (state, { location }) => {
    if (!state.selected) return state;

    if (!state.movableLocations?.includes(location) && !state.attackableLocations?.includes(location)) {
      return state;
    }
    const locationAction = actionUtil.getLocationAction(location, state.selected.allowedActions);
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
  })
);
