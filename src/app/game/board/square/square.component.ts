import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationStatus } from '../board.enums';
import { Store } from '@ngrx/store';
import { Unit } from '../../unit/unit.model';
import { UnitComponent } from '../../unit/unit.component';
import { CommonModule } from '@angular/common';
import { GameState } from 'src/app/state/game/game.state';
import { GameActions } from 'src/app/state/game/game.actions';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [
    CommonModule,
    UnitComponent
  ],
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareComponent {
  @Input({ required: true }) location!: string;
  @Input({ required: true }) bgColor!: number;
  @Input() unit: Unit | null = null;
  @Input() status: LocationStatus = LocationStatus.None;

  constructor(private gameStore: Store<GameState>) { }

  onClick() {
    switch (this.status) {
      case LocationStatus.Selectable:
        this.gameStore.dispatch(GameActions.selectUnit({ location: this.location }));
        break;
      case LocationStatus.Selected:
        this.gameStore.dispatch(GameActions.unselectUnit());
        break;
      case LocationStatus.Movable:
      case LocationStatus.Attackable:
      case LocationStatus.EnPassantable:
        this.gameStore.dispatch(GameActions.selectActionLocation({ location: this.location }));
    }
  }

}
