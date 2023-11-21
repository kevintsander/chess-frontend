import { Unit } from "../unit/unit.model";

export interface Square {
  location: string,
  colorClass: string,
  unit: Unit | null;
}
