import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class SquareComponent implements OnInit, OnChanges {
  @Input({ required: true }) location!: string;
  @Input({ required: true }) bgColor!: string;
  @Input() unit: Unit | null = null;
  @Input() status: LocationStatus = LocationStatus.None;
  @Output() click: EventEmitter<string> = new EventEmitter();

  bgClass!: string;
  displayStateClass!: string;

  constructor(store: Store<GameData>) {
  }

  ngOnInit(): void {
    this.bgClass = `bg-${this.bgColor}`;
    this.displayStateClass = this.getDisplayStateClass(this.status);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.displayStateClass = this.getDisplayStateClass(this.status);
  }

  onClick() {
    this.click.emit(this.location);
  }

  private getDisplayStateClass(displayState: LocationStatus) {
    switch (displayState) {
      case (LocationStatus.Selected):
        return "selected"
      case (LocationStatus.Selectable):
        return "selectable"
      case (LocationStatus.Movable):
        return "movable"
      case (LocationStatus.Attackable):
        return "attackable"
    }
    return "";
  }
}
