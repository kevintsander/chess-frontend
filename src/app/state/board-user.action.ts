import { createAction, props } from '@ngrx/store';
import { Action } from '../action/action.model';

export const startTurn = createAction('[User] Start Turn', props<{ allowedActions: Action[] }>());
export const selectUnit = createAction('[User] Select Unit', props<{ location: string, actions: Action[] }>());
export const unselectUnit = createAction('[User] Unselect Unit', props<{ allowedActions: Action[] }>());
export const hoverLocation = createAction('[User] Hover Location', props<{ location: string }>());
export const performAction = createAction('[User] Perform Action', props<{ location: string, toLocation: string }>());
export const promoteUnit = createAction('[User] Promote Unit');
