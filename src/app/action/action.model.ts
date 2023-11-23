import { Move } from "./move.model";

export interface Action {
  type: ActionType;
  moves: Move[];
  capture_unit: string | null;
}

export enum ActionType {
  None,
  Move,
  Attack,
  EnPassant,
  KingsideCastle,
  QueensideCastle
}
