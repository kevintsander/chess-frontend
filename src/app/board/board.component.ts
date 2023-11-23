import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SquareDisplayState } from './square-display-state.enum'
import { Unit } from '../unit/unit.model';
import { Action } from '../action/action.model';
import { Store } from '@ngrx/store';
import { selectUserBoard as selectBoardUser } from '../state/board-user.selector';
import { BoardUserState } from '../state/board-user.state';
import * as BoardUserActions from '../state/board-user.action';

interface SquareMap {
  [location: string]: {
    backgroundColor: string,
    unit: Unit | null,
    displayState: SquareDisplayState
  }
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnChanges, OnInit {
  @Input() boardState!: { units: Unit[], allowed_actions: Action[] }
  boardUserState!: BoardUserState;

  squares: SquareMap = {};
  squareMapTemplate: SquareMap = this.getSquareMapTemplate();
  selectedLocation!: string;

  constructor(private stateStore: Store) {
    this.stateStore.select(selectBoardUser).subscribe(state => {
      this.boardUserState = state;
      this.setSquares();
    });
  }

  ngOnInit() {
    this.stateStore.dispatch(BoardUserActions.startTurn({ allowedActions: this.boardState.allowed_actions }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setSquares();
  }

  private setSquares() {
    const squares: SquareMap = {}
    this.setUnits(squares);
    this.setDisplayStates(squares);

    this.squares = squares;
  }

  private getSquareMapTemplate(): SquareMap {
    const map: SquareMap = {};

    var bgColor = "square-dark"; // initialize with dark color
    for (let rowIndex = 1; rowIndex <= 8; rowIndex++) {
      for (let fileIndex = 97; fileIndex <= 104; fileIndex++) {
        const fileChar = String.fromCharCode(fileIndex);
        const location = `${fileChar}${rowIndex}`;
        map[location] = { backgroundColor: bgColor, unit: null, displayState: SquareDisplayState.None };
        bgColor = this.switchBgColor(bgColor);
      }
      bgColor = this.switchBgColor(bgColor);
    }
    return map;
  }
  private switchBgColor(colorClass: string) {
    return colorClass == "square-light" ? "square-dark" : "square-light";
  }

  private setUnits(squares: SquareMap) {
    for (const location in squares) {
      const square = squares[location];
      square.unit = this.boardState.units.find(u => u.location === location) ?? null;
    }
  }

  private setDisplayStates(squares: SquareMap) {
    if (this.boardUserState.selected) {
      squares[this.boardUserState.selected.location].displayState = SquareDisplayState.Selected
    }
    this.boardUserState.selectableLocations.forEach(l => {
      squares[l].displayState = SquareDisplayState.Selectable;
    })
    this.boardUserState.movableLocations.forEach(l => {
      squares[l].displayState = SquareDisplayState.Movable;
    })
    this.boardUserState.attackableLocations.forEach(l => {
      squares[l].displayState = SquareDisplayState.Attackable;
    })
    if (this.boardUserState.enPassantableLocation) {
      squares[this.boardUserState.enPassantableLocation].displayState = SquareDisplayState.EnPassantable
    }
    if (this.boardUserState.otherCastleUnitLocation) {
      squares[this.boardUserState.otherCastleUnitLocation].displayState = SquareDisplayState.OtherCastleLocation
    }
  }

}
