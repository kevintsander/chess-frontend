import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, of } from 'rxjs';
import { Player } from './player.model';
import { PlayerActions } from '../state/game/game.actions';
import { selectCurrentColor, selectPlayer1, selectPlayer2 } from '../state/game/game.selector';
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
  isCurrentColor$!: Observable<boolean>;
  isCurrentUser$!: Observable<boolean>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.player$ = this.getPlayer$();
    this.isCurrentColor$ = this.getIsCurrentColor$();
    this.isCurrentUser$ = this.getIsCurrentUser();
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

  getIsCurrentColor$(): Observable<boolean> {
    return this.store.select(selectCurrentColor).pipe(
      map((currentColor => (this.playerNum === 1 && currentColor === 'white') || (this.playerNum === 2 && currentColor === 'black')))
    )
  }

  getIsCurrentUser(): Observable<boolean> {
    return combineLatest([this.store.select(selectUser), this.player$]).pipe(
      map(([user, player]) => player?.id != null && player.id == user?.id)
    )
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
    })
  }

}
