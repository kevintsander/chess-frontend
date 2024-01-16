import { createReducer, on } from "@ngrx/store";
import { UserActions } from "./user.actions";
import { UserState } from "./user.state";

const initialState: UserState = {
  user: null,
  setPlayerOnLogin: null
}

export const userReducer = createReducer(
  initialState,

  on(UserActions.login, (state, { email, password, setPlayerOnLogin }) => {
    return {
      ...state,
      setPlayerOnLogin: setPlayerOnLogin
    }
  }),

  on(UserActions.loginSuccess, (state, { user }) => {
    return {
      ...state,
      user: user
    }
  })
);
