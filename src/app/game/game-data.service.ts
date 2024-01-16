import { Injectable } from '@angular/core';
import * as ActionCable from '@rails/actioncable';
import { Observable, Subject, Subscription, catchError, tap } from 'rxjs';
import { GameData } from './game-data.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private apiUrl = `${environment.chessApiUrl}/games`;
  private cableUrl = environment.chessActionCableUrl;
  private consumer: any;
  private currentGameData$: Observable<GameData> | null | undefined;
  receivedSubject: Subject<GameData> = new Subject<GameData>();

  constructor(private httpClient: HttpClient) {
    this.consumer = ActionCable.createConsumer(this.cableUrl);
  }

  createGame$(): Observable<string> {
    return this.httpClient.post(this.apiUrl, {}, { responseType: 'text' }).pipe(
      tap((id) => console.log(id))
    );
  }

  getGame$(game_id: string): Observable<GameData> {
    this.currentGameData$ = new Observable<GameData>(subscriber => {
      const channel = this.consumer.subscriptions.create({ channel: 'GameChannel', game_id: game_id }, {
        connected: () => {
          console.log(`connected to game channel (game_id: '${game_id})`);
        },
        disconnected: () => {
          console.log(`disconnected from game channel (game_id: '${game_id})`);
          // TODO: throw error here? this means server disconnected the channel.
        },
        received: (data: any) => {
          console.log(data);
          subscriber.next(data);
        }
      });

      return () => {
        console.log(`unsubscribing from game channel (game_id: '${game_id}')`);
        channel.unsubscribe();
      }
    });
    return this.currentGameData$;
  }

  setPlayer$(game_id: string, user_id: number, player: number): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${game_id}/player${player}`, { user_id });
  }

  performAction(gameId: string, unitLocation: string, moveLocation: string) {
    this.httpClient.put(`${this.apiUrl}/${gameId}`, { unit_location: unitLocation, move_location: moveLocation })
      .subscribe({
        next: (data) => console.log(`action succesful: game_id: ${gameId}, unit_location: ${unitLocation}, move_location: ${moveLocation}`),
        error: (error) => console.log(`error saving action: game_id: ${gameId}, unit_location: ${unitLocation}, move_location: ${moveLocation}`)
      });
  }

  performPromotion(gameId: string, promoteUnitType: string) {
    this.httpClient.put(`${this.apiUrl}/${gameId}`, { promote_unit_type: promoteUnitType })
      .subscribe({
        next: (data) => console.log(`promotion succesful: game_id: ${gameId}, promote_unit_type: ${promoteUnitType}`),
        error: (error) => console.log(`error promoting: game_id: ${gameId}, promote_unit_type: ${promoteUnitType}`)
      });
  }
}
