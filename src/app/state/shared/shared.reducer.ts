import { createReducer, on } from "@ngrx/store";
import { SharedState } from "./shared.state";
import { ToastActions } from "./shared.actions";

const initialState: SharedState = {
  toasts: []
}

export const sharedReducer = createReducer(
  initialState,

  on(ToastActions.popToast, (state, { toast }) => {
    return {
      ...state,
      toasts: [...state.toasts, toast]
    }
  }),

  on(ToastActions.eatToast, (state, { id }) => {
    return {
      ...state,
      toasts: state.toasts.filter(toast => toast.id !== id)
    }
  })
)
