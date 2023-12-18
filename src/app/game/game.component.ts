import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GameState } from './state/game.state';
import { selectGame } from './state/game.selector';
import { GameActions } from './state/game.actions';
import { GameStatus } from './game-status.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  currentGameSub!: Subscription;
  gameState$?: Observable<GameState>;

  constructor(private store: Store<GameState>) { }

  ngOnInit(): void {
    this.gameState$ = this.store.select(selectGame);
  }

  loadGame(id: string) {
    this.store.dispatch(GameActions.startGame({ id: id }));
  }

  createGame() {
    this.store.dispatch(GameActions.createGame());
  }

}
