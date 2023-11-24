import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SquareDisplayState } from './square-display-state.enum'
import { Unit } from '../unit/unit.model';
import { Action } from '../action/action.model';
import { Store } from '@ngrx/store';
import { BoardUserState } from '../state/board-user.state';
import * as BoardUserActions from '../state/board-user.action';
import { selectBoardUser } from '../state/board-user.selector';
import { Square } from './square.model';
import { KeyValue } from '@angular/common';

interface SquareMap {
  [location: string]: Square
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

  constructor(private stateStore: Store<BoardUserState>) { }

  ngOnInit() {
    this.stateStore.select(selectBoardUser).subscribe(state => {
      this.boardUserState = state;
      this.setSquares();
    });
    this.stateStore.dispatch(BoardUserActions.startTurn({ allowedActions: this.boardState.allowed_actions }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setSquares();
  }

  onSquareClick(location: string) {
    if (this.boardUserState.selected?.location !== location && this.boardUserState.selectableLocations.includes(location)) {
      this.stateStore.dispatch(BoardUserActions.selectUnit({ location: location, actions: this.boardState.allowed_actions.filter(a => a.moves.some(m => m.from_location === location)) }));
    }
  }

  locationComparer(a: KeyValue<string, Square>, b: KeyValue<string, Square>) {
    const aFile = a.key.charAt(0);
    const bFile = a.key.charAt(0);
    const aRank = a.key.charAt(1);
    const bRank = b.key.charAt(1);

    if (aFile <= bFile && aRank < bRank) {
      return -1
    }
    else if (aFile === bFile && aRank === bRank) {
      return 0
    }
    else {
      return 1
    }
  }

  private setSquares() {
    const squares: SquareMap = structuredClone(this.squareMapTemplate);
    this.setUnits(squares);
    this.setDisplayStates(squares);
    this.squares = squares;
  }

  private getSquareMapTemplate(): SquareMap {
    const map: SquareMap = {};

    var bgColor = "square-dark"; // initialize with dark color
    for (let fileIndex = 97; fileIndex <= 104; fileIndex++) {
      for (let rowIndex = 1; rowIndex <= 8; rowIndex++) {
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
    if (!this.boardUserState) { return }

    if (this.boardUserState.selected) {
      squares[this.boardUserState.selected.location].displayState = SquareDisplayState.Selected
    }
    this.boardUserState.selectableLocations.forEach(l => {
      if (this.boardUserState.selected?.location != l) {
        squares[l].displayState = SquareDisplayState.Selectable;
      }
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
