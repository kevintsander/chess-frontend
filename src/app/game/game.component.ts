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
    this.gameService.getGame('f3777531-665a-4374-b63c-b33331fc7595').subscribe({
      next: (response) => {
        console.log(response)
        this.chessGame = response;
        console.log(this.chessGame)
      }
    });
  }
}
