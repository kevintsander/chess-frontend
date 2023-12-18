import { Injectable } from '@angular/core';
import * as ActionCable from '@rails/actioncable';
import { Observable, Subject, Subscription, catchError } from 'rxjs';
import { GameData } from './game-data.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private consumer: any;
  receivedSubject: Subject<GameData> = new Subject<GameData>();

  constructor(private httpClient: HttpClient) {
    this.consumer = ActionCable.createConsumer('http://localhost:3000/cable'); // TODO - move to config
  }

  getGame$(game_id: string): Observable<GameData> {
    const game$ = new Observable<GameData>(subscriber => {
      const channel = this.consumer.subscriptions.create({ channel: 'GameChannel', game_id: game_id }, {
        connected: () => {
          console.log(`connected to game channel (game_id: '${game_id})`);
        },
        disconnected: () => {
          console.log(`disconnected from game channel (game_id: '${game_id})`);
          // TODO: throw error here? this means server disconnected the channel.
        },
        received: (data: any) => {
          console.log('helo')
          console.log(data);
          subscriber.next(data);
        }
      });

      return () => {
        channel.unsubscribe();
      }
    });
    return game$;
  }

  performAction(gameId: string, unitLocation: string, moveLocation: string) {
    this.httpClient.put(`${environment.chessApiUrl}/games/${gameId}`, { unit_location: unitLocation, move_location: moveLocation })
      .subscribe({
        next: (data) => console.log(`action succesful: game_id: ${gameId}, unit_location: ${unitLocation}, move_location: ${moveLocation}`),
        error: (error) => console.log(`error saving action: game_id: ${gameId}, unit_location: ${unitLocation}, move_location: ${moveLocation}`)
      });
  }

  performPromotion(gameId: string, promoteUnitType: string) {
    this.httpClient.put(`${environment.chessApiUrl}/games/${gameId}`, { promote_unit_type: promoteUnitType })
      .subscribe({
        next: (data) => console.log(`promotion succesful: game_id: ${gameId}, promote_unit_type: ${promoteUnitType}`),
        error: (error) => console.log(`error promoting: game_id: ${gameId}, promote_unit_type: ${promoteUnitType}`)
      });
  }
}
