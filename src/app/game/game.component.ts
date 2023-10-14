import { Component, OnInit } from '@angular/core';
import { GameApiService } from './game-api.service';
import { Game } from './game.model';
import { GameStateService } from '../game-state/game-state.service';
import { ActionCableService } from '../actioncable.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  chessGame: Game | undefined;
  gameStateService!: GameStateService;

  constructor(public gameService: GameApiService, public actionCableService: ActionCableService) { }

  loadGame(id: string) {
    this.gameService.getGame(id)
      .subscribe((response) => {
        this.chessGame = response;
        this.gameStateService = new GameStateService(this.chessGame.game_state);
      });

    this.actionCableService.subscribe(id);
    this.actionCableService.getReceivedSubject().subscribe(result => {
      this.chessGame = result;
      this.gameStateService.gameState = this.chessGame.game_state;
    })
  }

}
