import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap, withLatestFrom } from 'rxjs';
import { GameState } from '../state/game/game.state';
import { Player } from './player.model';
import { PlayerActions } from '../state/game/game.actions';
import { selectCurrentColor, selectCurrentPlayer, selectPlayer1, selectPlayer2 } from '../state/game/game.selector';
import { LoginComponent } from '../user/login/login.component';
import { CommonModule } from '@angular/common';
import { selectUser } from '../state/user/user.selector';
import { Router } from '@angular/router';

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
  currentColorSub!: Subscription;
  isCurrentColor: boolean = false;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    if (this.playerNum === 1) {
      this.player$ = this.store.select(selectPlayer1);
    }
    else if (this.playerNum === 2) {
      this.player$ = this.store.select(selectPlayer2);
    }
    this.currentColorSub = this.store.select(selectCurrentColor).subscribe({
      next: (currentColor) => {
        this.isCurrentColor = this.playerNum === 1 && currentColor === 'white' || this.playerNum === 2 && currentColor === 'black';
      }
    });
  }

  onClick() {
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

  ngOnDestroy() {
    this.currentColorSub.unsubscribe();
  }

}
