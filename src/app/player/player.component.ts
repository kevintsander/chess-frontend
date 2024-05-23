import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest, of, tap, withLatestFrom } from 'rxjs';
import { GameState } from '../state/game/game.state';
import { Player } from './player.model';
import { PlayerActions } from '../state/game/game.actions';
import { selectCurrentColor, selectCurrentPlayer, selectPlayer1, selectPlayer2 } from '../state/game/game.selector';
import { LoginComponent } from '../user/login/login.component';
import { CommonModule } from '@angular/common';
import { selectUser } from '../state/user/user.selector';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [
    LoginComponent,
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {
  @Input({ required: true }) playerNum!: number;
  @Input() align: string = "start";

  player$!: Observable<Player | null>;
  currentColorSub!: Subscription;
  currentUserSub!: Subscription;
  isCurrentColor: boolean = false;

  isCurrentUser: boolean = false;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.player$ = this.getPlayer$();
    this.subscrubeCurrentColor();
    this.subscribeCurrentUser();
  }

  getPlayer$(): Observable<Player | null> {
    let player: Observable<Player | null> = of(null);
    if (this.playerNum === 1) {
      player = this.store.select(selectPlayer1);
    }
    else if (this.playerNum === 2) {
      player = this.store.select(selectPlayer2);
    }
    return player;
  }

  subscrubeCurrentColor(): void {
    this.currentColorSub = this.store.select(selectCurrentColor).subscribe({
      next: (currentColor) => {
        this.isCurrentColor = this.playerNum === 1 && currentColor === 'white' || this.playerNum === 2 && currentColor === 'black';
      }
    });
  }

  subscribeCurrentUser(): void {
    this.currentUserSub = combineLatest([this.player$, this.store.select(selectUser)], (player, user) => {
      this.isCurrentUser = player?.id != null && player.id === user?.id;
    }).subscribe();
  }

  onClick(): void {
    this.store.select(selectUser).subscribe({
      next: (user) => {
        if (user) {
          this.store.dispatch(PlayerActions.setPlayer({ playerNum: this.playerNum, id: user.id }))
        }
        else {
          this.router.navigate([{ outlets: { dialog: 'login' } }], { queryParams: { setPlayerOnLogin: this.playerNum } })
        }
      }
    }).unsubscribe();
  }

  ngOnDestroy(): void {
    this.currentColorSub.unsubscribe();
    this.currentUserSub.unsubscribe();
  }

}
