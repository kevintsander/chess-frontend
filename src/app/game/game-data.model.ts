import { Action } from "./action/action.model";
import { Promote } from "./action/promote.model";
import { GameStatus } from "./game-status.enum";
import { Unit } from "./unit/unit.model";

export interface GameData {
  id: string;
  turn: number;
  current_player: string;
  allowed_actions: Action[];
  promote_unit_location: string;
  units: Unit[];
  status: GameStatus;
  created_at: Date;
  updated_at: Date;
}
