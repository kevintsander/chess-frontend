import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Square } from './square.model';
import { SquareDisplayState } from './square-display-state.enum';
import { GameData } from '../game-data.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareComponent implements OnInit, OnChanges {
  @Input() state!: { location: string, square: Square }
  @Output() click: EventEmitter<string> = new EventEmitter();

  bgClass!: string;
  displayStateClass!: string;

  constructor(store: Store<GameData>) {
  }

  ngOnInit(): void {
    this.bgClass = `bg-${this.state.square.backgroundColor}`;
    this.displayStateClass = this.getDisplayStateClass(this.state.square.displayState);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.displayStateClass = this.getDisplayStateClass(this.state.square.displayState);
  }

  onClick() {
    this.click.emit(this.state.location);
  }

  private getDisplayStateClass(displayState: SquareDisplayState) {
    switch (displayState) {
      case (SquareDisplayState.Selected):
        return "selected"
      case (SquareDisplayState.Selectable):
        return "selectable"
      case (SquareDisplayState.Movable):
        return "movable"
      case (SquareDisplayState.Attackable):
        return "attackable"
    }
    return "";
  }
}