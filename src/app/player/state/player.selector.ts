import { createSelector, createFeatureSelector } from "@ngrx/store";
import { PlayerState } from "./player.state";


export const selectPlayerState = createFeatureSelector<PlayerState>('players');
export const selectPlayer1 = createSelector(selectPlayerState, state => state.player1);
export const selectPlayer2 = createSelector(selectPlayerState, state => state.player2);
export const selectShowPlayer1Login = createSelector(selectPlayerState, state => state.showPlayer1Login);
export const selectShowPlayer2Login = createSelector(selectPlayerState, state => state.showPlayer2Login);
