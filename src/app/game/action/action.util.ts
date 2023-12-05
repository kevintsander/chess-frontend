import { Unit } from "../unit/unit.model";
import { ActionType } from "./action-type.enum";
import { Action } from "./action.model";

export class ActionUtil {
  getSelectableLocations(actions: Action[]): string[] {
    return [...new Set(actions.flatMap(a => a.moves.flatMap(m => m.from_location)))];
  }

  getMovableLocations(actions: Action[]): string[] {
    return [... new Set(actions.filter(a => a.type === ActionType.Move)?.flatMap(a => a.moves.map(m => m.to_location)))] ?? [];
  }

  getAttackableLocations(actions: Action[]): string[] {
    return [... new Set(actions.filter(a => a.type === ActionType.Attack)?.flatMap(a => a.moves.map(m => m.to_location)))] ?? [];
  }

  getOtherCastleUnitLocation(location: string, action: Action) {
    return action.moves.find(m => m.to_location !== location)!.to_location
  }

  getUnitActions(location: string, actions: Action[]) {
    return actions.filter(a => a.moves.some(m => m.from_location === location));
  }

  getLocationAction(location: string, actions: Action[]) {
    return actions.find(a => a.moves.some(m => m.to_location === location)) ?? null;
  }

  getLocationUnit(location: string, units: Unit[]) {
    return units.find(u => u.location === location) ?? null;
  }
}
