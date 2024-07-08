import { createSelector, createFeatureSelector } from "@ngrx/store";
import { UserState } from "./user.state";
import { selectQueryParam } from "../router/router.selectors";


export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(selectUserState, state => state.user);

export const selectSetPlayerOnLogin = selectQueryParam('setPlayerOnLogin');
