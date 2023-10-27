import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameApiService } from '../api-client/game-api.service';
import { DataGame } from '../api-client/data-game.model';
import { DataGameStateUtil } from '../api-client/data-game-state.service';
import { ActionCableService } from '../api-client/actioncable.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnDestroy {
  chessGame: DataGame | undefined;
  gameStateService!: DataGameStateUtil;
  currentGameSub!: Subscription;

  constructor(public gameService: GameApiService, public actionCableService: ActionCableService) { }

  loadGame(id: string) {
    this.currentGameSub?.unsubscribe(); // unsubscribe to any already loaded game
    this.currentGameSub = this.actionCableService.getGame$(id)
      .subscribe((response) => {
        this.chessGame = response;
        this.gameStateService = new DataGameStateUtil(this.chessGame.game_state);
      });
  }

  ngOnDestroy(): void {
    this.currentGameSub?.unsubscribe();
  }

}
