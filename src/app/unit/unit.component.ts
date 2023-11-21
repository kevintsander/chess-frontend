import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Unit } from './unit.model';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitComponent {
  @Input({ required: true }) unit!: Unit;

  constructor() { }

  onClick(): void {
    console.log("clicked unit"); // TODO - move this up to square?
    // if (this.gameStateService.isSelectable(this.unit.location)) {
    //   if (this.turnStateService.selectedUnit === this.unit) {
    //     this.turnStateService.deselectUnit();
    //   } else {
    //     this.turnStateService.selectUnit(this.unit);
    //   }
    // }
  }
}
