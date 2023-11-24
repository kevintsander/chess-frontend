import { Unit } from "../unit/unit.model";
import { SquareDisplayState } from "./square-display-state.enum";

export interface Square {
  backgroundColor: string,
  unit: Unit | null,
  displayState: SquareDisplayState
}
