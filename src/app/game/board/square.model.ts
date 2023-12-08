import { Unit } from "../unit/unit.model";
import { LocationStatus } from "./location-status.enum";

export interface Square {
  backgroundColor: string,
  unit: Unit | null,
  displayState: LocationStatus
}
