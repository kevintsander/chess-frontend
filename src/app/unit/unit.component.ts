import { Component, Input } from '@angular/core';
import { DataUnit } from '../api-client/data-unit.model';
import { DataGameStateUtil } from '../api-client/data-game-state.service';
import { TurnStateService } from '../turn-state.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent {
  @Input({ required: true }) unit!: DataUnit;
  @Input() gameStateService!: DataGameStateUtil;

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
