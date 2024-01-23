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
    return {
      ...state,
      showLogin: true,
      setPlayerOnLogin: setPlayerOnLogin
    }
  }),

  on(UserActions.hideLogin, (state) => {
    return {
      ...state,
      showLogin: false,
      setPlayerOnLogin: null
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
