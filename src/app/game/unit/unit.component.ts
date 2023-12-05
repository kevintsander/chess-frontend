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
}
