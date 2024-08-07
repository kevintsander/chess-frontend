import { createSelector, createFeatureSelector } from "@ngrx/store";
import { GameState } from "./game.state";
import { ActionUtil } from "../../data/game/action/action.util";
import { ActionType } from "../../data/game/action/action-type.enum";
import { selectUser } from "src/app/state/user/user.selectors";
import { selectRouteParam } from "../router/router.selectors";

const gameDataActionUtil = new ActionUtil();

export const selectGameState = createFeatureSelector<GameState>('game');
export const selectGameId = selectRouteParam('gameId');
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
      gameDataActionUtil
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
    var unitActions = gameDataActionUtil.getFromLocationActions(selectedLocation, allowedActions);
    return gameDataActionUtil.getMovableLocations(unitActions)
  }
);

export const selectAttackableLocations = createSelector(
  selectSelectedLocation,
  selectAllowedActions,
  (selectedLocation, allowedActions) => {
    if (selectedLocation == null) { return [] }
    var unitActions = gameDataActionUtil.getFromLocationActions(selectedLocation, allowedActions);
    return gameDataActionUtil.getAttackableLocations(unitActions)
  }
);


export const selectEnPassantableLocations = createSelector(
  selectSelectedLocation,
  selectAllowedActions,
  (selectedLocation, allowedActions) => {
    if (selectedLocation == null) { return [] }
    var unitActions = gameDataActionUtil.getFromLocationActions(selectedLocation, allowedActions);
    return gameDataActionUtil.getEnPassantableLocations(unitActions)
  }
);

export const selectSelectedEnPassantAttackLocation = createSelector(
  selectSelectedLocation,
  selectSelectedActionLocation,
  selectAllowedActions,
  (selectedLocation, selectedActionLocation, allowedActions) => {
    if (selectedLocation == null || selectedActionLocation == null) { return null }

    const locationAction = gameDataActionUtil.getToLocationAction(selectedLocation, selectedActionLocation, allowedActions);
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

    const locationAction = gameDataActionUtil.getToLocationAction(selectedLocation, selectedActionLocation, allowedActions);
    var selectedQueensideCastleOtherUnitLocation: string | null = null;
    if (locationAction && [ActionType.KingsideCastle, ActionType.QueensideCastle].includes(locationAction.type)) {
      selectedQueensideCastleOtherUnitLocation = gameDataActionUtil.getOtherCastleUnitLocation(selectedActionLocation, locationAction);
    }
    return selectedQueensideCastleOtherUnitLocation;
  }
);

export const selectLocationStates = createSelector(
  selectSelectedLocation,
  selectSelectedActionLocation,
  selectSelectableLocations,
  selectAttackableLocations,
  selectEnPassantableLocations,
  selectMovableLocations,
  selectSelectedEnPassantAttackLocation,
  selectSelectedCastleOtherUnitLocation,
  selectCurrentPlayer,
  selectUser,
  (selectedLocation, selectedActionLocation, selectableLocations, attackableLocations, enPassantableLocations, movableLocations, selectedEnPassantAttackLocation, selectedCastleOtherUnitLocation, currentPlayer, user) => {
    return { selectedLocation, selectedActionLocation, selectableLocations, attackableLocations, enPassantableLocations, movableLocations, selectedEnPassantAttackLocation, selectedCastleOtherUnitLocation, currentPlayer, user }
  }
);
