import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, } from 'rxjs';
import { Store } from '@ngrx/store';
import { GameState } from '../state/game/game.state';
import { selectGameId, selectGameState } from '../state/game/game.selector';
import { GameActions } from '../state/game/game.actions';
import { BoardComponent } from './board/board.component';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from '../player/player.component';
import { PromoteUnitComponent } from './promote-unit/promote-unit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MetaComponent } from './meta/meta.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    BoardComponent,
    PlayerComponent,
    PromoteUnitComponent,
    MetaComponent,
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
  gameState$!: Observable<GameState>;
  showLogin$!: Observable<boolean>;

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectGameId).subscribe(id => {
      if (id) {
        this.store.dispatch(GameActions.subscribeGame({ id: id }));
      }
    });

    // TODO: move to game state container --- or rename this something else and make innter game
    this.gameState$ = this.store.select(selectGameState);
  }

  ngOnDestroy(): void {
    this.store.dispatch(GameActions.clearGame());
  }

}
