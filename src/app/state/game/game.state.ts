import { Player } from "src/app/ui/player/player.model";
import { Action } from "../../data/game/action/action.model";
import { GameDataStatus } from "../../data/game/game-data-status.enum";
import { Unit } from "../../ui/game/unit/unit.model";

export interface GameState {
  id: string | undefined;

  player1: Player | null,
  player2: Player | null

  turn: number | null;
  current_color: string | null;
  status: GameDataStatus;

  units: Unit[];
  allowedActions: Action[];

  selectedLocation: string | null;
  selectedActionLocation: string | null;

  promoteUnitLocation: string | null;
  selectedPromoteUnitType: string | null;

}
