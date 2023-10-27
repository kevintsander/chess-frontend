import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataUnit } from './api-client/data-unit.model';

@Injectable({
  providedIn: 'root'
})
export class TurnStateService {

  private selectedUnitSubject: Subject<DataUnit | null> = new Subject<DataUnit | null>
  public selectedUnit!: DataUnit | null;

  constructor() { }

  public getSelectedUnitObservable(): Observable<DataUnit | null> {
    return this.selectedUnitSubject.asObservable();
  }

  public selectUnit(unit: DataUnit): void {
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
