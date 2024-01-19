import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlayerState } from './state/player.state';
import { Observable, Subscription, of } from 'rxjs';
import { selectPlayer1, selectPlayer2, selectShowPlayer1Login, selectShowPlayer2Login } from './state/player.selector';
import { UserState } from '../user/state/user.state';
import { User } from '../user/user.model';
import { selectUser } from '../user/state/user.selector';
import { PlayerActions } from './state/player.actions';
import { GameState } from '../game/state/game.state';
import { Player } from './state/player.model';

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

  constructor(private playerStore: Store<PlayerState>, private gameStore: Store<GameState>) { }

  ngOnInit(): void {
    if (this.playerNum === 1) {
      this.showPlayerLogin$ = this.playerStore.select(selectShowPlayer1Login);
      this.player$ = this.gameStore.select(selectPlayer1);
    }
    else if (this.playerNum === 2) {
      this.showPlayerLogin$ = this.playerStore.select(selectShowPlayer2Login);
      this.player$ = this.gameStore.select(selectPlayer2);
    }
  }

  onClick() {
    if (this.playerNum === 1) {
      this.playerStore.dispatch(PlayerActions.startSetPlayer1());
    }
    else if (this.playerNum === 2) {
      this.playerStore.dispatch(PlayerActions.startSetPlayer2());
    }
  }

}
