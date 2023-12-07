import { createSelector, createFeatureSelector } from "@ngrx/store";
import { GameState } from "./game.state";

export const selectGame = createFeatureSelector<GameState>('game');
export const selectGameId = createSelector(selectGame, state => state.id);
export const selectMustPromote = createSelector(selectGame, state => state.mustPromote);
export const selectMovableLocations = createSelector(selectGame, state => state.movableLocations);
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
)
