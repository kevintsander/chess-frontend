import { Player } from "./player.model"

export interface PlayerState {
  showPlayer1Login: boolean,
  showPlayer2Login: boolean,
  player1: Player | null,
  player2: Player | null
}
