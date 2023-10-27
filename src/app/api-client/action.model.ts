import { DataUnit } from "./data-unit.model";
import { DataMove } from "./data-move.model";

export interface DataAction {
  moves: DataMove[];
  location_notation: string;
  capture_unit: null | DataUnit;
}
