import { Component, Input } from '@angular/core';
import { Unit } from './unit.model';
import { GameStateService } from '../game-state/game-state.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent {
  @Input({ required: true }) unit!: Unit;
  @Input() gameStateService!: GameStateService;
}
