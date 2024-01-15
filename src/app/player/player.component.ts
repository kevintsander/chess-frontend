import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlayerState } from './state/player.state';
import { Observable, Subscription, of } from 'rxjs';
import { selectPlayer1, selectPlayerState, selectShowPlayer1Login, selectShowPlayer2Login } from './state/player.selector';
import { UserActions } from '../user/state/user.actions';
import { UserState } from '../user/state/user.state';
import { User } from '../user/user.model';
import { selectUser } from '../user/state/user.selector';
import { PlayerActions } from './state/player.actions';
import { Player } from './state/player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  @Input({ required: true }) player!: string;

  showPlayerLogin$!: Observable<boolean>;

  // currentUserSub!: Subscription;
  // currentUser: User | null = null;

  constructor(private playerStore: Store<PlayerState>) { }

  ngOnInit(): void {
    if (this.player === "player1") {
      this.showPlayerLogin$ = this.playerStore.select(selectShowPlayer1Login);
    }
    else if (this.player === "player2") {
      this.showPlayerLogin$ = this.playerStore.select(selectShowPlayer2Login);
    }
  }

  onClick() {
    if (this.player === "player1") {
      this.playerStore.dispatch(PlayerActions.showPlayer1Login());
    }
    else if (this.player === "player2") {
      this.playerStore.dispatch(PlayerActions.showPlayer2Login());
    }
  }

  ngOnDestroy(): void {
    // this.currentUserSub.unsubscribe();
  }

}
