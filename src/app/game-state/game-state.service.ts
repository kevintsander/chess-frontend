import { Injectable } from '@angular/core';
import { GameState } from './game-state.model';
import { Unit } from '../unit/unit.model';
import { Action } from '../action/action.model';

export class GameStateService {

  constructor(public gameState: GameState) { }

  unitAt = (location: string): Unit | undefined => {
    const unit = this.gameState.board.units.find(unit => unit.location == location);
    return unit;
  }

  isSelectable(location: string): boolean {
    const allowed_actions: Action[] = this.gameState.allowed_actions_cache[location]?.filter(a => {
      return a.moves.some(m => {
        return m.unit.player.name == this.gameState.current_player.name
      });
    })
    return allowed_actions != null && allowed_actions.length > 0;
  }
}
