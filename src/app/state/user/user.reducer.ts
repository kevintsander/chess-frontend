import { createReducer, on } from "@ngrx/store";
import { UserActions } from "./user.actions";
import { UserState } from "./user.state";

const initialState: UserState = {
  user: null,
}

export const userReducer = createReducer(
  initialState,

  on(UserActions.setCurrentUser, (state, { user }) => {
    return {
      ...state,
      user: user
    }
  }),
);
