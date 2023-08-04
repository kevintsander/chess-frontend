import { Component, Input } from '@angular/core';
import { Board } from './board.model';
import { Square } from './square.model';
import { Unit } from '../unit/unit.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() board?: Board;
  squares: Array<Square> = [];
  JSON;

  constructor() {
    this.JSON = JSON;
    this.initSquares();
  }

  getUnit(location: string): Unit | null | undefined {
    return this.board?.units.find(unit => unit.location == location);
  }

  private colorClass = "square-dark";
  initSquares() {
    for (let rowIndex = 1; rowIndex <= 8; rowIndex++) {
      for (let fileIndex = 97; fileIndex <= 104; fileIndex++) {
        const fileChar = String.fromCharCode(fileIndex);
        const coordinate = `${fileChar}${rowIndex}`;
        this.squares.push({ coordinate: `${fileChar}${rowIndex}`, colorClass: this.colorClass } as Square);
        this.switchColorClass();
      }
      this.switchColorClass();
    }
  }

  private switchColorClass() {
    this.colorClass = this.colorClass == "square-light" ? "square-dark" : "square-light";
  }

}
