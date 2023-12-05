import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SquareDisplayState } from './square-display-state.enum'
import { Unit } from '../unit/unit.model';
import { Action } from '../action/action.model';
import { Store } from '@ngrx/store';
import { Square } from './square.model';
import { KeyValue } from '@angular/common';
import { GameState } from '../state/game.state';
import { GameActions } from '../state/game.actions';
import { selectGame } from '../state/game.selector';

interface SquareMap {
  [location: string]: Square
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  gameState: GameState | undefined;

  squares: SquareMap = {};
  squareMapTemplate: SquareMap = this.getSquareMapTemplate();
  selectedLocation!: string;

  constructor(private stateStore: Store<GameState>) { }

  ngOnInit() {
    this.stateStore.select(selectGame).subscribe(gameState => {
      this.gameState = gameState;
      this.setSquares();
    })
  }

  onSquareClick(location: string) {
    if (!this.gameState) return;

    if (this.gameState.selectedLocation !== location && this.gameState.selectableLocations.includes(location)) {
      this.stateStore.dispatch(GameActions.selectUnit({ location: location }));
    }
    else if (this.gameState.selectedLocation === location) {
      this.stateStore.dispatch(GameActions.unselectUnit());
    }
    else if (this.gameState.movableLocations.includes(location) || this.gameState.attackableLocations.includes(location)) {
      this.stateStore.dispatch(GameActions.selectActionLocation({ location: location }))
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
    const squares = structuredClone(this.squareMapTemplate) // deep copy;
    this.setUnits(squares);
    this.setDisplayStates(squares);
    this.squares = squares;
  }

  private getSquareMapTemplate(): SquareMap {
    const map: SquareMap = {};

    var bgColor = "dark"; // initialize with dark color
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
    return colorClass == "light" ? "dark" : "light";
  }

  private setUnits(squares: SquareMap) {
    for (const location in squares) {
      const square = squares[location];
      square.unit = this.gameState?.units.find(u => u.location === location) ?? null;
    }
  }

  private setDisplayStates(squares: SquareMap) {
    if (!this.gameState) { return };

    if (this.gameState.selectedLocation) {
      squares[this.gameState.selectedLocation].displayState = SquareDisplayState.Selected
    }
    this.gameState.selectableLocations.forEach(l => {
      if (this.gameState!.selectedLocation != l) {
        squares[l].displayState = SquareDisplayState.Selectable;
      }
    })
    this.gameState.movableLocations.forEach(l => {
      squares[l].displayState = SquareDisplayState.Movable;
    })
    this.gameState.attackableLocations.forEach(l => {
      squares[l].displayState = SquareDisplayState.Attackable;
    })
    if (this.gameState.enPassantableLocation) {
      squares[this.gameState.enPassantableLocation].displayState = SquareDisplayState.EnPassantable
    }
    if (this.gameState.otherCastleUnitLocation) {
      squares[this.gameState.otherCastleUnitLocation].displayState = SquareDisplayState.OtherCastleLocation
    }
  }


}
