import { Action } from "../action/action.model";
import { Unit } from "../unit/unit.model";

export interface GameState {
  id: string | undefined;

  players: string[];
  turn: number | null;
  current_player: string | null;

  units: Unit[];
  allowedActions: Action[];

  selectedLocation: string | null;
  selectedActionLocation: string | null;

  mustPromote: boolean;
  selectedPromoteUnitType: string | null;
}
