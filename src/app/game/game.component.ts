import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameApiService } from './game-api.service';
import { Game } from './game.model';
import { GameStateService } from '../game-state/game-state.service';
import { ActionCableService } from '../actioncable.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy {
  chessGame: Game | undefined;
  gameStateService!: GameStateService;
  currentGameSub!: Subscription;

  constructor(public gameService: GameApiService, public actionCableService: ActionCableService) { }

  loadGame(id: string) {
    this.currentGameSub?.unsubscribe(); // unsubscribe to any already loaded game
    this.currentGameSub = this.actionCableService.getGame$(id)
      .subscribe((response) => {
        this.chessGame = response;
        this.gameStateService = new GameStateService(this.chessGame.game_state);
      });
  }

  ngOnDestroy(): void {
    this.currentGameSub?.unsubscribe();
  }

}
