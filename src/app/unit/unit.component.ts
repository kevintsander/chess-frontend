import { Component, Input } from '@angular/core';
import { Unit } from './unit.model';
import { GameStateService } from '../game-state/game-state.service';
import { TurnStateService } from '../turn-state.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent {
  @Input({ required: true }) unit!: Unit;
  @Input() gameStateService!: GameStateService;

  constructor(protected turnStateService: TurnStateService) { }

  onClick(): void {
    if (this.gameStateService.isSelectable(this.unit.location)) {
      if (this.turnStateService.selectedUnit === this.unit) {
        this.turnStateService.deselectUnit();
      } else {
        this.turnStateService.selectUnit(this.unit);
      }
    }
  }
}
