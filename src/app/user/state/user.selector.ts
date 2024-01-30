import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UserState } from "./user.state";


export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(selectUserState, state => state.user);
export const selectShowLogin = createSelector(selectUserState, state => state.showLogin);
export const selectShowSignUp = createSelector(selectUserState, state => state.showSignUp);
export const selectSetPlayerOnLogin = createSelector(selectUserState, state => state.setPlayerOnLogin);
