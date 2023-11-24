import { createReducer, on } from '@ngrx/store';

import * as BoardUserActions from './board-user.action';
import { ActionUtil } from '../action/action.util';
import { BoardUserState } from './board-user.state';

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
  on(BoardUserActions.startTurn, (state, { allActions: allowedActions }) => {
    return {
      ...initialState,
      selectableLocations: actionUtil.getSelectableLocations(allowedActions)
    }
  }),
  on(BoardUserActions.selectUnit, (state, { location, unitActions: actions }) => {
    return {
      ...state,
      selected: { location: location, allowedActions: actions },
      hoverLocation: null,
      movableLocations: actionUtil.getMovableLocations(actions),
      attackableLocations: actionUtil.getAttackableLocations(actions),
      enPassantableLocation: null,
      otherCastleUnitLocation: null
    };
  }),
  on(BoardUserActions.unselectUnit, (state, { allActions: allowedActions }) => {
    return {
      ...initialState,
      selectableLocations: actionUtil.getSelectableLocations(allowedActions)
    }
  }),
  on(BoardUserActions.hoverLocation, (state, { location }) => {
    if (!state.selected) return state;

    if (!state.movableLocations?.includes(location) && !state.attackableLocations?.includes(location)) {
      return state;
    }
    const locationAction = actionUtil.getLocationAction(location, state.selected.allowedActions);
    if (!locationAction) return state;

    var enPassantableLocation: string | null = null;
    var otherCastleUnitLocation: string | null = null;
    if (locationAction.type = "ActionType") {
      enPassantableLocation = locationAction.capture_unit!;
    }
    else if (["KingsideCastle", "QueensideCastle"].includes(locationAction.type)) {
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
