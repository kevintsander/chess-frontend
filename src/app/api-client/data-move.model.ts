import { DataUnit } from "./data-unit.model";

export interface DataMove {
  unit: DataUnit;
  location: string;
  from_location: string;
}
