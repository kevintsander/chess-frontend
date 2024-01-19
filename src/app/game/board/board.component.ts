import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LocationStatus } from './board.enums'
import { Store } from '@ngrx/store';
import { GameState } from '../state/game.state';
import { GameActions } from '../state/game.actions';
import { selectLocationStates, selectUnits } from '../state/game.selector';
import { Unit } from '../unit/unit.model';
import { INIT_STATUS_MAP, INIT_UNIT_MAP } from './board.constants';
import { Subscription } from 'rxjs';
import { SquareComponent } from './square/square.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    SquareComponent
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit, OnDestroy {
  gameState: GameState | undefined;
  bgColorMap: { [location: string]: string } = {};
  unitMap: { [location: string]: Unit | null } = {};
  statusMap: { [location: string]: LocationStatus } = {};

  private unitsSub!: Subscription;
  private locationStatesSub!: Subscription;

  constructor(private stateStore: Store<GameState>, private changeDet: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscribeUnits();
    this.subscribeLocationStates();
  }

  private subscribeUnits() {
    this.unitsSub = this.stateStore.select(selectUnits).subscribe((units) => {
      var newUnitMap: { [location: string]: Unit } = {}
      units.filter(unit => unit.location).forEach(unit => {
        newUnitMap[unit.location] = { ...unit };
      })
      this.unitMap = { ...INIT_UNIT_MAP, ...newUnitMap };
      this.changeDet.markForCheck(); // not exactly sure why this is needed here but not below
    });
  }

  private subscribeLocationStates() {
    this.stateStore.select(selectLocationStates).subscribe((locationStates) => {
      const newStatuses: { [location: string]: LocationStatus } = {};

      if (locationStates.currentPlayer?.id === locationStates.user?.id) {

        if (locationStates.selectedLocation) {
          newStatuses[locationStates.selectedLocation] = LocationStatus.Selected;
        }
        if (locationStates.selectedActionLocation) {
          newStatuses[locationStates.selectedActionLocation] = LocationStatus.SelectedAction;
        }
        locationStates.selectableLocations.forEach((selectableLocation) => {
          newStatuses[selectableLocation] = LocationStatus.Selectable;
        });
        locationStates.attackableLocations.forEach((attackableLocation) => {
          newStatuses[attackableLocation] = LocationStatus.Attackable;
        });
        locationStates.movableLocations.forEach((movableLocation) => {
          newStatuses[movableLocation] = LocationStatus.Movable;
        });
        if (locationStates.selectedEnPassantAttackLocation) {
          newStatuses[locationStates.selectedEnPassantAttackLocation] = LocationStatus.EnPassantable;
        }
        if (locationStates.selectedCastleOtherUnitLocation) {
          newStatuses[locationStates.selectedCastleOtherUnitLocation] = LocationStatus.OtherCastleLocation;
        }
      }

      this.statusMap = { ...INIT_STATUS_MAP, ...newStatuses };
    })
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

  ngOnDestroy(): void {
    this.unitsSub?.unsubscribe();
    this.locationStatesSub?.unsubscribe();
  }
}
