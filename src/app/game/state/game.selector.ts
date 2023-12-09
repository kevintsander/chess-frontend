import { createSelector, createFeatureSelector } from "@ngrx/store";
import { GameState } from "./game.state";
import { ActionUtil } from "../action/action.util";
import { ActionType } from "../action/action-type.enum";
import { LocationStatus } from "../board/board.enums";

const actionUtil = new ActionUtil();

export const selectGame = createFeatureSelector<GameState>('game');
export const selectGameId = createSelector(selectGame, state => state.id);
export const selectUnits = createSelector(selectGame, state => state.units);
export const selectAllowedActions = createSelector(selectGame, state => state.allowedActions);
export const selectMustPromote = createSelector(selectGame, state => state.mustPromote);
export const selectSelectedLocation = createSelector(selectGame, state => state.selectedLocation);
export const selectSelectedActionLocation = createSelector(selectGame, state => state.selectedActionLocation);
export const selectSelectedPromoteUnitType = createSelector(selectGame, state => state.selectedPromoteUnitType);

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

export const selectLocationStatusMap = createSelector(
  selectSelectedLocation,
  selectSelectedActionLocation,
  selectSelectableLocations,
  selectAttackableLocations,
  selectMovableLocations,
  selectSelectedEnPassantAttackLocation,
  selectSelectedCastleOtherUnitLocation,
  (selectedLocation, selectedActionLocation, selectableLocations, attackableLocations, movableLocations, selectedEnPassantAttackLocation, selectedCastleOtherUnitLocation) => {
    const boardLocationStates: { [location: string]: LocationStatus } = {};

    if (selectedLocation) {
      boardLocationStates[selectedLocation] = LocationStatus.Selected;
    }
    if (selectedActionLocation) {
      boardLocationStates[selectedActionLocation] = LocationStatus.SelectedAction;
    }
    selectableLocations.forEach((selectableLocation) => {
      boardLocationStates[selectableLocation] = LocationStatus.Selectable;
    });
    attackableLocations.forEach((attackableLocation) => {
      boardLocationStates[attackableLocation] = LocationStatus.Attackable;
    });
    movableLocations.forEach((movableLocation) => {
      boardLocationStates[movableLocation] = LocationStatus.Movable;
    });
    if (selectedEnPassantAttackLocation) {
      boardLocationStates[selectedEnPassantAttackLocation] = LocationStatus.EnPassantable;
    }
    if (selectedCastleOtherUnitLocation) {
      boardLocationStates[selectedCastleOtherUnitLocation] = LocationStatus.OtherCastleLocation;
    }

    return boardLocationStates;
  }
);

