import { Component, OnInit } from '@angular/core';
import { Observable, } from 'rxjs';
import { Store } from '@ngrx/store';
import { GameState } from './state/game.state';
import { selectGameState } from './state/game.selector';
import { GameActions } from './state/game.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameState$?: Observable<GameState>;

  constructor(private store: Store<GameState>) { }


  ngOnInit(): void {
    this.gameState$ = this.store.select(selectGameState);
  }

  loadGame(id: string) {
    this.store.dispatch(GameActions.endGame());
    this.store.dispatch(GameActions.startGame({ id: id }));
  }

  createGame() {
    this.store.dispatch(GameActions.createGame());
  }

  endGame() {
    this.store.dispatch(GameActions.endGame());
  }

}
