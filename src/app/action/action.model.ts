import { Move } from "./move.model";

export interface Action {
  type: string;
  moves: Move[];
  capture_unit: string | null;
}
