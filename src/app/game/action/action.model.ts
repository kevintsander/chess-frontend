import { ActionType } from "./action-type.enum";
import { Move } from "./move.model";

export interface Action {
  type: ActionType;
  moves: Move[];
  capture_unit: string | null;
}
