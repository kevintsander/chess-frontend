import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlayerState } from './state/player.state';
import { Observable, Subscription, of } from 'rxjs';
import { selectShowPlayer1Login, selectShowPlayer2Login } from './state/player.selector';
import { UserState } from '../user/state/user.state';
import { User } from '../user/user.model';
import { selectUser } from '../user/state/user.selector';
import { PlayerActions } from './state/player.actions';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {
  @Input({ required: true }) player!: number;

  showPlayerLogin$!: Observable<boolean>;

  constructor(private playerStore: Store<PlayerState>) { }

  ngOnInit(): void {
    if (this.player === 1) {
      this.showPlayerLogin$ = this.playerStore.select(selectShowPlayer1Login);
    }
    else if (this.player === 2) {
      this.showPlayerLogin$ = this.playerStore.select(selectShowPlayer2Login);
    }
  }

  onClick() {
    if (this.player === 1) {
      this.playerStore.dispatch(PlayerActions.startSetPlayer1());
    }
    else if (this.player === 2) {
      this.playerStore.dispatch(PlayerActions.startSetPlayer2());
    }
  }

}
