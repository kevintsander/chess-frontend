import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameState } from '../game/state/game.state';
import { Player } from './player.model';
import { PlayerActions } from '../game/state/game.actions';
import { selectPlayer1, selectPlayer2 } from '../game/state/game.selector';
import { LoginComponent } from '../user/login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    LoginComponent,
    CommonModule
  ],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {
  @Input({ required: true }) playerNum!: number;

  player$!: Observable<Player | null>;

  constructor(private gameStore: Store<GameState>) { }

  ngOnInit(): void {
    if (this.playerNum === 1) {
      this.player$ = this.gameStore.select(selectPlayer1);
    }
    else if (this.playerNum === 2) {
      this.player$ = this.gameStore.select(selectPlayer2);
    }
  }

  onClick() {
    this.gameStore.dispatch(PlayerActions.startSetPlayer({ playerNum: this.playerNum }));
  }

}
