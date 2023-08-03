import { Unit } from "../unit/unit.model";

export interface Move {
  unit: Unit;
  location: string;
  from_location: string;
}
