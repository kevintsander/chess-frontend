import { Component, OnInit } from '@angular/core';
import { GameApiService } from './game-api.service';
import { Game } from './game.model';
import { GameStateService } from '../game-state/game-state.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  chessGame: Game | undefined;
  gameStateService!: GameStateService;

  constructor(public gameService: GameApiService) { }

  loadGame(id: string) {
    this.gameService.getGame(id)
      .subscribe((response) => {
        this.chessGame = response;
        this.gameStateService = new GameStateService(this.chessGame.game_state);
      });
  }

}
