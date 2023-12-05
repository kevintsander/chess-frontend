import { Action } from "./action/action.model";
import { Unit } from "./unit/unit.model";

export interface GameData {
  id: string;
  turn: number;
  current_player: string;
  allowed_actions: Action[];
  units: Unit[];
  created_at: Date;
  updated_at: Date;
}
