import { Action } from "../action/action.model";

export interface BoardUserState {
  allowedActions: Action[],
  selectableLocations: string[];
  hoverLocation: string | null;
  selected: {
    location: string,
    allowedActions: Action[]
  } | null
  movableLocations: string[];
  attackableLocations: string[];
  enPassantableLocation: string | null;
  otherCastleUnitLocation: string | null;
}
