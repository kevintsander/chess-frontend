import { GameState } from "./game-state.model";

export interface Game {
  id: string;
  game_state: GameState;
  created_at: string;
  updated_at: string;
}
