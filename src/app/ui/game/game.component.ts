import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { GameState } from '../../state/game/game.state';
import { selectGameId, selectGameState } from '../../state/game/game.selectors';
import { GameActions, PlayerActions } from '../../state/game/game.actions';
import { BoardComponent } from './board/board.component';
import { CommonModule } from '@angular/common';
import { PromoteUnitComponent } from './promote-unit/promote-unit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { GameDataStatus } from "../../data/game/game-data-status.enum";
import { selectUser } from 'src/app/state/user/user.selectors';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    BoardComponent,
    PromoteUnitComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  gameStatus = GameDataStatus;
  gameState$!: Observable<GameState>;
  showLogin$!: Observable<boolean>;

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectGameId).subscribe(id => {
      if (id) {
        this.store.dispatch(GameActions.subscribeGame({ id: id }));
      }
    });
    this.gameState$ = this.store.select(selectGameState);

  }

  ngOnDestroy(): void {
    this.store.dispatch(GameActions.clearGame());
  }

  onPlayerClick(playerNum: number): void {
    this.store.select(selectUser).pipe(
      take(1),
      tap(user => {
        if (user) {
          this.store.dispatch(PlayerActions.setPlayer({ playerNum: playerNum, id: user.id }))
        }
        else {
          this.router.navigate([{ outlets: { dialog: 'login' } }], { queryParams: { setPlayerOnLogin: playerNum } })
        }
      })).subscribe();
  }
}
