import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Game } from './game.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  chessGame: Game | undefined;
  JSON;

  constructor(public gameService: GameService) {
    this.JSON = JSON;
  }

  ngOnInit() {

  }

  loadGame(id: string) {
    this.gameService.getGame(id)
      .subscribe((response) => {
        this.chessGame = response;
      });
  }
}
