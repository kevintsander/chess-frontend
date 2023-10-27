import { DataGameState } from "./data-game-state.model";

export interface DataGame {
  id: string;
  game_state: DataGameState;
  created_at: string;
  updated_at: string;
}
