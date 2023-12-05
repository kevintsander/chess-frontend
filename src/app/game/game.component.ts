import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GameState } from './state/game.state';
import { selectGame } from './state/game.selector';
import { GameActions } from './state/game.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  currentGameSub!: Subscription;
  gameState?: GameState;

  constructor(private store: Store<GameState>) { }

  ngOnInit(): void {
    this.store.select(selectGame).subscribe(s => {
      this.gameState = s;
    })
  }

  loadGame(id: string) {
    this.store.dispatch(GameActions.startGame({ id: id }));
  }

}
