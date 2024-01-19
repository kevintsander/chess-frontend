import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Unit } from './unit.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitComponent {
  @Input({ required: true }) unit!: Unit;

  constructor() { }
}
