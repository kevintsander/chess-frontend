import { createReducer, on } from "@ngrx/store";
import { UserActions } from "./user.actions";
import { UserState } from "./user.state";
import { PlayerActions } from "src/app/game/state/game.actions";

const initialState: UserState = {
  user: null,
  showLogin: false,
  setPlayerOnLogin: null
}

export const userReducer = createReducer(
  initialState,

  on(UserActions.showLogin, (state, { setPlayerOnLogin }) => {
    const newShowLogin = !state.showLogin

    return {
      ...state,
      showLogin: newShowLogin,
      setPlayerOnLogin: newShowLogin == true ? setPlayerOnLogin : null // unset player if not showing login
    }
  }),

  on(UserActions.login, (state, { email, password }) => {
    return {
      ...state,
    }
  }),

  on(UserActions.loginSuccess, (state, { user }) => {
    return {
      ...state,
      showLogin: false
    }
  }),

  on(UserActions.setCurrentUser, (state, { user }) => {
    return {
      ...state,
      user: user
    }
  }),

  on(PlayerActions.setPlayer, (state) => {
    return {
      ...state,
      setPlayerOnLogin: null
    }
  })
);
