import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Square } from './square.model';
import { SquareDisplayState } from './square-display-state.enum';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareComponent implements OnInit {
  @Input() state!: { location: string, square: Square }
  @Output() click: EventEmitter<string> = new EventEmitter();

  colorClass!: string;

  constructor() {
  }

  ngOnInit(): void {
    this.colorClass = this.getColorClass(this.state.square.displayState);
  }

  onClick() {
    this.click.emit(this.state.location);
  }

  private getColorClass(displayState: SquareDisplayState) {
    switch (displayState) {
      case (SquareDisplayState.Selected):
        return "selected"
      case (SquareDisplayState.Selectable):
        return "selectable"
      case (SquareDisplayState.Movable):
        return "movable"
      case (SquareDisplayState.Attackable):
        return "attackable"
    };
    return this.state.square.backgroundColor;
  }
}
