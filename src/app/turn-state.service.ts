import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Unit } from './unit/unit.model';

@Injectable({
  providedIn: 'root'
})
export class TurnStateService {

  private selectedUnitSubject: Subject<Unit | null> = new Subject<Unit | null>
  public selectedUnit!: Unit | null;

  constructor() { }

  public getSelectedUnitObservable(): Observable<Unit | null> {
    return this.selectedUnitSubject.asObservable();
  }

  public selectUnit(unit: Unit): void {
    this.selectedUnit = unit;
    this.selectedUnitSubject
    this.emitSelectedUnit();
  }

  public deselectUnit(): void {
    this.selectedUnit = null;
    this.emitSelectedUnit();
  }

  private emitSelectedUnit(): void {
    this.selectedUnitSubject.next(this.selectedUnit);
  }
}
