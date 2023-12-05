import { createSelector, createFeatureSelector } from "@ngrx/store";
import { GameState } from "./game.state";

export const selectGame = createFeatureSelector<GameState>('game');
export const selectMustPromote = createSelector(selectGame, state => state.mustPromote);
export const selectMovableLocations = createSelector(selectGame, state => state.movableLocations);
