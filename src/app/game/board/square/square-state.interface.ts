import { Unit } from "../../unit/unit.model";
import { LocationStatus } from "../board.enums";

export interface ISquareState {
  location: string,
  unit: Unit | null,
  bgColor: number,
  status: LocationStatus
}
