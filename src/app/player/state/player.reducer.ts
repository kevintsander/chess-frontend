import { createReducer, on } from "@ngrx/store";
import { PlayerActions } from "./player.actions";
import { PlayerState } from "./player.state";
import { GameActions } from "src/app/game/state/game.actions";

const initialState: PlayerState = {
  showPlayer1Login: false,
  showPlayer2Login: false,
  player1: null,
  player2: null,
}

export const playerReducer = createReducer(
  initialState,

  on(GameActions.receiveGameData, (state, { gameData }) => {

    return {
      ...state,
      player1: gameData.player1,
      player2: gameData.player2,
    }
  }),


  on(PlayerActions.showPlayer1Login, (state) => {
    return {
      ...state,
      showPlayer1Login: true,
      showPlayer2Login: false
    }
  }),

  on(PlayerActions.showPlayer2Login, (state) => {
    return {
      ...state,
      showPlayer1Login: false,
      showPlayer2Login: true
    }
  }),

  on(PlayerActions.setPlayer1, (state) => {
    return {
      ...state,
      showPlayer1Login: false,
      showPlayer2Login: false
    }
  }),

  on(PlayerActions.setPlayer2, (state) => {
    return {
      ...state,
      showPlayer1Login: false,
      showPlayer2Login: false
    }
  }),

);
