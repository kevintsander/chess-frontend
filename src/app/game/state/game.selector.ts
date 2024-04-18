import { createSelector, createFeatureSelector } from "@ngrx/store";
import { GameState } from "./game.state";
import { ActionUtil } from "../action/action.util";
import { ActionType } from "../action/action-type.enum";
import { selectUser } from "src/app/user/state/user.selector";

const actionUtil = new ActionUtil();

export const selectGameState = createFeatureSelector<GameState>('game');
export const selectGameId = createSelector(selectGameState, state => state.id);
export const selectCurrentColor = createSelector(selectGameState, state => state.current_color);
export const selectUnits = createSelector(selectGameState, state => state.units);
export const selectAllowedActions = createSelector(selectGameState, state => state.allowedActions);
export const selectStatus = createSelector(selectGameState, state => state.status);
export const selectSelectedLocation = createSelector(selectGameState, state => state.selectedLocation);
export const selectSelectedActionLocation = createSelector(selectGameState, state => state.selectedActionLocation);
export const selectSelectedPromoteUnitType = createSelector(selectGameState, state => state.selectedPromoteUnitType);
export const selectPlayer1 = createSelector(selectGameState, state => state.player1);
export const selectPlayer2 = createSelector(selectGameState, state => state.player2);
export const selectCurrentPlayer = createSelector(selectGameState, selectCurrentColor, (playerState, currentColor) => currentColor === "white" ? playerState.player1 : playerState.player2);

export const selectSelectedActionWithId = createSelector(
  selectGameId,
  selectSelectedLocation,
  selectSelectedActionLocation,
  (id, selectedLocation, selectedActionLocation) => {
    return { id, selectedLocation, selectedActionLocation };
  }
);

export const selectSelectableLocations = createSelector(
  selectSelectedLocation,
  selectAllowedActions,
  (selectedLocation, allowedActions) => {
    var selectableLocations =
      actionUtil
        .getSelectableLocations(allowedActions)
        .filter(l => l != selectedLocation);
    return selectableLocations;
  }
);

export const selectMovableLocations = createSelector(
  selectSelectedLocation,
  selectAllowedActions,
  (selectedLocation, allowedActions) => {
    if (selectedLocation == null) { return [] }
    var unitActions = actionUtil.getFromLocationActions(selectedLocation, allowedActions);
    return actionUtil.getMovableLocations(unitActions)
  }
);

export const selectAttackableLocations = createSelector(
  selectSelectedLocation,
  selectAllowedActions,
  (selectedLocation, allowedActions) => {
    if (selectedLocation == null) { return [] }
    var unitActions = actionUtil.getFromLocationActions(selectedLocation, allowedActions);
    return actionUtil.getAttackableLocations(unitActions)
  }
);


export const selectSelectedEnPassantAttackLocation = createSelector(
  selectSelectedLocation,
  selectSelectedActionLocation,
  selectAllowedActions,
  (selectedLocation, selectedActionLocation, allowedActions) => {
    if (selectedLocation == null || selectedActionLocation == null) { return null }

    const locationAction = actionUtil.getToLocationAction(selectedLocation, selectedActionLocation, allowedActions);
    var selectedEnPassantAttackLocation: string | null = null;
    if (locationAction && locationAction.type === ActionType.EnPassant) {
      selectedEnPassantAttackLocation = locationAction.capture_unit;
    }
    return selectedEnPassantAttackLocation;
  }
);

export const selectSelectedCastleOtherUnitLocation = createSelector(
  selectSelectedLocation,
  selectSelectedActionLocation,
  selectAllowedActions,
  (selectedLocation, selectedActionLocation, allowedActions) => {
    if (selectedLocation == null || selectedActionLocation == null) { return null }

    const locationAction = actionUtil.getToLocationAction(selectedLocation, selectedActionLocation, allowedActions);
    var selectedQueensideCastleOtherUnitLocation: string | null = null;
    if (locationAction && [ActionType.KingsideCastle, ActionType.QueensideCastle].includes(locationAction.type)) {
      selectedQueensideCastleOtherUnitLocation = actionUtil.getOtherCastleUnitLocation(selectedActionLocation, locationAction);
    }
    return selectedQueensideCastleOtherUnitLocation;
  }
);

export const selectLocationStates = createSelector(
  selectSelectedLocation,
  selectSelectedActionLocation,
  selectSelectableLocations,
  selectAttackableLocations,
  selectMovableLocations,
  selectSelectedEnPassantAttackLocation,
  selectSelectedCastleOtherUnitLocation,
  selectCurrentPlayer,
  selectUser,
  (selectedLocation, selectedActionLocation, selectableLocations, attackableLocations, movableLocations, selectedEnPassantAttackLocation, selectedCastleOtherUnitLocation, currentPlayer, user) => {
    return { selectedLocation, selectedActionLocation, selectableLocations, attackableLocations, movableLocations, selectedEnPassantAttackLocation, selectedCastleOtherUnitLocation, currentPlayer, user }
  }
);
