import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Game } from './game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  chessGame: Game | undefined;

  constructor(public gameService: GameService) { }


  loadGame(id: string) {
    this.gameService.getGame(id)
      .subscribe((response) => {
        this.chessGame = response;
      });
  }
}
