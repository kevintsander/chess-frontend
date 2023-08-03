import { Unit } from "../unit/unit.model";
import { Move } from "./move.model";

export interface Action {
  moves: Move[];
  location_notation: string;
  capture_unit: null | Unit;
}
