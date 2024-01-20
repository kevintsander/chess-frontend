import { Player } from "src/app/player/player.model";
import { Action } from "../action/action.model";
import { Promote } from "../action/promote.model";
import { GameStatus } from "../game-status.enum";
import { Unit } from "../unit/unit.model";

export interface GameState {
  id: string | undefined;

  player1: Player | null,
  player2: Player | null

  turn: number | null;
  current_color: string | null;
  status: GameStatus;

  units: Unit[];
  allowedActions: Action[];

  selectedLocation: string | null;
  selectedActionLocation: string | null;

  promoteUnitLocation: string | null;
  selectedPromoteUnitType: string | null;

}
