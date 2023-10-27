import { Injectable } from '@angular/core';
import { DataGameState } from './data-game-state.model';
import { DataUnit } from './data-unit.model';
import { DataAction } from './action.model';

export class DataGameStateUtil {

  constructor(public gameState: DataGameState) { }

  unitAt = (location: string): DataUnit | undefined => {
    const unit = this.gameState.board.units.find(unit => unit.location == location);
    return unit;
  }

  isSelectable(location: string): boolean {
    const allowed_actions: DataAction[] = this.gameState.allowed_actions_cache[location]?.filter(a => {
      return a.moves.some(m => {
        return m.unit.player.name == this.gameState.current_player.name
      });
    })
    return allowed_actions != null && allowed_actions.length > 0;
  }
}
