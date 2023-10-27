import { DataAction } from "./action.model";
import { DataBoard } from "./data-board.model";
import { DataPlayer } from "./data-player.model";

// This interface handles data coming from the API
export interface DataGameState {
  players: DataPlayer[];
  game_log: {
    turn: number;
    action: DataAction;
  }[];
  board: DataBoard;
  allowed_actions_cache: {
    [key: string]: DataAction[];
  };
  turn: number;
  current_player: DataPlayer;
}
