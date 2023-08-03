import { Action } from "../action/action.model";
import { Board } from "../board/board.model";
import { Player } from "../player/player.model";

export interface GameState {
  players: Player[];
  game_log: {
    turn: number;
    action: Action;
  }[];
  board: Board;
  allowed_actions_cache: {
    [key: string]: Action[];
  };
  turn: number;
  current_player: Player;
}
