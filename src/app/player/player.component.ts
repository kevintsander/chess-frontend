import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameState } from '../game/state/game.state';
import { Player } from './player.model';
import { PlayerActions } from '../game/state/game.actions';
import { selectPlayer1, selectPlayer2, selectShowPlayer1Login, selectShowPlayer2Login } from '../game/state/game.selector';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {
  @Input({ required: true }) playerNum!: number;

  showPlayerLogin$!: Observable<boolean>;
  player$!: Observable<Player | null>;

  constructor(private gameStore: Store<GameState>) { }

  ngOnInit(): void {
    if (this.playerNum === 1) {
      this.showPlayerLogin$ = this.gameStore.select(selectShowPlayer1Login);
      this.player$ = this.gameStore.select(selectPlayer1);
    }
    else if (this.playerNum === 2) {
      this.showPlayerLogin$ = this.gameStore.select(selectShowPlayer2Login);
      this.player$ = this.gameStore.select(selectPlayer2);
    }
  }

  onClick() {
    if (this.playerNum === 1) {
      this.gameStore.dispatch(PlayerActions.startSetPlayer1());
    }
    else if (this.playerNum === 2) {
      this.gameStore.dispatch(PlayerActions.startSetPlayer2());
    }
  }

}
