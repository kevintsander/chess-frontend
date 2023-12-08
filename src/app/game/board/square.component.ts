import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Square } from './square.model';
import { LocationStatus } from './location-status.enum';
import { GameData } from '../game-data.model';
import { Store } from '@ngrx/store';
import { Unit } from '../unit/unit.model';

@Component({
  selector: 'app-square',
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
    console.log('hello?')
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
