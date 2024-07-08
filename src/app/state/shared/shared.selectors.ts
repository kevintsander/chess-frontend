import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

export const selectSharedState = createFeatureSelector<SharedState>('shared');
export const selectToasts = createSelector(selectSharedState, state => state.toasts);
