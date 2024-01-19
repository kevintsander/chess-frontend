import { Player } from "../player/player.model";
import { Action } from "./action/action.model";
import { GameStatus } from "./game-status.enum";
import { Unit } from "./unit/unit.model";

export interface GameData {
  id: string;
  turn: number;
  current_color: string | null;
  player1: Player;
  player2: Player;
  allowed_actions: Action[];
  promote_unit_location: string | null;
  units: Unit[];
  status: GameStatus;
  created_at: Date;
  updated_at: Date;
}
