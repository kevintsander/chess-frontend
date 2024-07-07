import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationStatus } from '../board.enums';
import { GameData } from '../../game-data.model';
import { Store } from '@ngrx/store';
import { Unit } from '../../unit/unit.model';
import { UnitComponent } from '../../unit/unit.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [
    CommonModule,
    UnitComponent
  ],
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareComponent {
  @Input({ required: true }) location!: string;
  @Input({ required: true }) bgColor!: number;
  @Input() unit: Unit | null = null;
  @Input() status: LocationStatus = LocationStatus.None;
  @Output() click: EventEmitter<{ location: string, status: LocationStatus }> = new EventEmitter();

  constructor(store: Store<GameData>) { }

  onClick() {
    this.click.emit({ location: this.location, status: this.status });
  }

}
