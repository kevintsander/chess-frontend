import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocationStatus } from './location-status.enum'
import { Store } from '@ngrx/store';
import { Square } from './square.model';
import { KeyValue } from '@angular/common';
import { GameState } from '../state/game.state';
import { GameActions } from '../state/game.actions';
import { selectLocationsStatuses, selectUnits } from '../state/game.selector';
import { Unit } from '../unit/unit.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  gameState: GameState | undefined;
  locations: { [location: string]: { bgColor: string, unit: Unit | null, status: LocationStatus } } = {
    "a1": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "a2": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "a3": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "a4": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "a5": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "a6": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "a7": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "a8": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "b1": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "b2": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "b3": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "b4": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "b5": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "b6": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "b7": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "b8": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "c1": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "c2": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "c3": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "c4": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "c5": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "c6": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "c7": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "c8": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "d1": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "d2": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "d3": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "d4": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "d5": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "d6": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "d7": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "d8": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "e1": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "e2": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "e3": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "e4": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "e5": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "e6": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "e7": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "e8": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "f1": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "f2": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "f3": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "f4": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "f5": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "f6": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "f7": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "f8": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "g1": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "g2": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "g3": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "g4": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "g5": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "g6": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "g7": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "g8": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "h1": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "h2": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "h3": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "h4": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "h5": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "h6": { bgColor: "color2", unit: null, status: LocationStatus.None },
    "h7": { bgColor: "color1", unit: null, status: LocationStatus.None },
    "h8": { bgColor: "color2", unit: null, status: LocationStatus.None },
  };

  constructor(private stateStore: Store<GameState>) { }

  ngOnInit() {
    this.setUnits();
    this.setStatuses();
  }

  private setUnits() {
    this.stateStore.select(selectUnits).subscribe((units) => {
      units.filter(unit => unit.location).forEach(unit => {
        console.log(`setting unit ${unit.location}`);
        this.locations[unit.location].unit = unit;
      })
    });
  }

  private setStatuses() {
    this.stateStore.select(selectLocationsStatuses).subscribe((locationsStatuses) => {
      for (const location in locationsStatuses) {
        const displayState = locationsStatuses[location];
        this.locations[location].status = displayState;
      }
    });
  }

  onSquareClick(location: string) {
    const locationStatus = this.locations[location]?.status;
    if (!locationStatus) { return }

    if (locationStatus == LocationStatus.Selectable) {
      this.stateStore.dispatch(GameActions.selectUnit({ location: location }));
    }
    else if (locationStatus == LocationStatus.Selected) {
      this.stateStore.dispatch(GameActions.unselectUnit());
    }
    else if ([LocationStatus.Movable, LocationStatus.Attackable].includes(locationStatus)) {
      this.stateStore.dispatch(GameActions.selectActionLocation({ location: location }));
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
}
