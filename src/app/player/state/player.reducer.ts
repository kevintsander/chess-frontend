import { createReducer, on } from "@ngrx/store";
import { PlayerActions } from "./player.actions";
import { PlayerState } from "./player.state";

const initialState: PlayerState = {
  showPlayer1Login: false,
  showPlayer2Login: false,
  player1: null,
  player2: null
}

export const playerReducer = createReducer(
  initialState,

  on(PlayerActions.showPlayer1Login, (state) => {
    return {
      ...state,
      showPlayer1Login: true
    }
  }),

  on(PlayerActions.showPlayer2Login, (state) => {
    return {
      ...state,
      showPlayer2Login: true
    }
  })

);
