import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LocationStatus } from './board.enums'
import { Store } from '@ngrx/store';
import { GameState } from '../state/game.state';
import { GameActions } from '../state/game.actions';
import { selectLocationStatusMap, selectUnits } from '../state/game.selector';
import { Unit } from '../unit/unit.model';
import { INIT_STATUS_MAP, INIT_UNIT_MAP } from './board.constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  gameState: GameState | undefined;
  bgColorMap: { [location: string]: string } = {};
  unitMap: { [location: string]: Unit | null } = {};
  statusMap: { [location: string]: LocationStatus } = {};

  constructor(private stateStore: Store<GameState>, private changeDet: ChangeDetectorRef) { }

  ngOnInit() {
    this.setUnits();
    this.setStatuses();
  }

  private setUnits() {
    this.stateStore.select(selectUnits).subscribe((units) => {
      var newUnitMap: { [location: string]: Unit } = {}
      units.filter(unit => unit.location).forEach(unit => {
        newUnitMap[unit.location] = { ...unit };
      })
      this.unitMap = { ...INIT_UNIT_MAP, ...newUnitMap };
      this.changeDet.markForCheck(); // not exactly sure why this is needed here but not below
    });
  }

  private setStatuses() {
    this.stateStore.select(selectLocationStatusMap).subscribe((locationsStatuses) => {
      this.statusMap = { ...INIT_STATUS_MAP, ...locationsStatuses }
    });
  }

  onSquareClick(location: string) {
    const locationStatus = this.statusMap[location];
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
}
