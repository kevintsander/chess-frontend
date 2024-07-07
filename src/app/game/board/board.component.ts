import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocationStatus } from './board.enums'
import { Store } from '@ngrx/store';
import { GameState } from '../../state/game/game.state';
import { GameActions } from '../../state/game/game.actions';
import { selectLocationStates, selectUnits } from '../../state/game/game.selector';
import { Unit } from '../unit/unit.model';
import { Observable, combineLatest, forkJoin, map, tap } from 'rxjs';
import { SquareComponent } from './square/square.component';
import { ISquareState } from './square/square-state.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    SquareComponent,
    CommonModule
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  private static squareStatesTemplate: ISquareState[] = [];

  squareStates$?: Observable<ISquareState[]>;

  static {
    this.initSquareStatesTemplate();
  }

  private static initSquareStatesTemplate() {
    const boardSize = 8;
    const startChar = 97; // lowercase a
    let color1 = true;
    const ranks = [...Array(boardSize).keys()].map(i => i + 1)
    const files = [...Array(boardSize).keys()].map(i => String.fromCharCode(i + 97))

    ranks.forEach(rank => {
      files.forEach(file => {
        const location = file + rank.toString();
        this.squareStatesTemplate.push({
          location,
          bgColor: color1 ? 1 : 2,
          unit: null,
          status: LocationStatus.None
        })
        color1 = !color1;
      });
      color1 = !color1;
    })
  }

  constructor(private stateStore: Store<GameState>) { }

  ngOnInit() {
    this.squareStates$ = this.getSquareStates$();
  }

  private getSquareStates$(): Observable<ISquareState[]> {
    return combineLatest(
      [this.getUnitMap$(), this.getStatusMap$()],
      (unitMap, statusMap) => {
        const states = [...BoardComponent.squareStatesTemplate]
        states.forEach(state => {
          state.status = statusMap[state.location] ?? LocationStatus.None;
          state.unit = unitMap[state.location] ?? null;
        })
        return states;
      });
  }

  private getUnitMap$(): Observable<{ [location: string]: Unit }> {
    return this.stateStore.select(selectUnits).pipe(
      map(units => {
        var newUnitMap: { [location: string]: Unit } = {}
        units.filter(unit => unit.location).forEach(unit => {
          newUnitMap[unit.location] = { ...unit };
        })
        return { ...newUnitMap };
      }));
  }

  private getStatusMap$(): Observable<{ [location: string]: LocationStatus }> {

    return this.stateStore.select(selectLocationStates).pipe(
      map(locationStates => {
        const newStatuses: { [location: string]: LocationStatus } = {};

        if (locationStates.user && locationStates.currentPlayer?.id === locationStates.user.id) {

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
          locationStates.enPassantableLocations.forEach((enPassantableLocation) => {
            newStatuses[enPassantableLocation] = LocationStatus.EnPassantable;
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

        return { ...newStatuses };
      })
    )
  }

  onSquareClick(event: { location: string, status: LocationStatus }) {
    const status = event.status;
    const location = event.location;

    if (!status) { return }

    if (status == LocationStatus.Selectable) {
      this.stateStore.dispatch(GameActions.selectUnit({ location: location }));
    }
    else if (status == LocationStatus.Selected) {
      this.stateStore.dispatch(GameActions.unselectUnit());
    }
    else if ([LocationStatus.Movable, LocationStatus.Attackable, LocationStatus.EnPassantable].includes(status)) {
      this.stateStore.dispatch(GameActions.selectActionLocation({ location: location }));
    }
  }
}


