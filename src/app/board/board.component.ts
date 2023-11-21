import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Square } from './square.model';
import { Unit } from '../unit/unit.model';
import { Action } from '../action/action.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnChanges {
  @Input() state!: { units: Unit[], allowed_actions: Action[] }

  private squaresTemplate!: Array<Square>;
  squares: Array<Square> = [];
  JSON;

  constructor() {
    this.JSON = JSON;
    this.initSquareTemplate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setupSquares();
  }

  private setupSquares() {
    const squares = [...this.squaresTemplate];
    for (const square of squares) {
      square.unit = this.state.units.find(u => u.location === square.location) ?? null;
    }
    this.squares = squares;
  }

  initSquareTemplate() {
    this.squaresTemplate = [];
    var colorClass = "square-dark";
    for (let rowIndex = 1; rowIndex <= 8; rowIndex++) {
      for (let fileIndex = 97; fileIndex <= 104; fileIndex++) {
        const fileChar = String.fromCharCode(fileIndex);
        const location = `${fileChar}${rowIndex}`;
        this.squaresTemplate.push({ location: location, colorClass: colorClass } as Square);
        colorClass = this.switchColorClass(colorClass);
      }
      colorClass = this.switchColorClass(colorClass);
    }
  }

  private switchColorClass(colorClass: string) {
    return colorClass == "square-light" ? "square-dark" : "square-light";
  }

}
