import { Component, Input } from '@angular/core';
import { Square } from './square.model';
import { DataAction } from '../api-client/action.model';
import { DataGameStateUtil } from '../api-client/data-game-state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() gameStateService!: DataGameStateUtil;
  @Input() unitsAllowedActions?: { [key: string]: DataAction[] }

  squares: Array<Square> = [];
  JSON;

  constructor() {
    this.JSON = JSON;
    this.initSquares();
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
