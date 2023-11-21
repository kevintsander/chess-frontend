import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from './game.model';
import { GameDataService } from './game-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy {
  game: Game | undefined | null;
  currentGameSub!: Subscription;

  constructor(public gameDataService: GameDataService) { }

  loadGame(id: string) {
    this.endGame();
    this.currentGameSub = this.gameDataService.getGame$(id)
      .subscribe((response) => {
        console.log(response);
        this.game = response;
      });
  }

  endGame() {
    if (!this.game) return;

    this.currentGameSub.unsubscribe();
    this.game = null;
  }

  ngOnDestroy(): void {
    this.endGame();
  }

}
