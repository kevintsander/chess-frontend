import { Injectable } from '@angular/core';
import * as ActionCable from '@rails/actioncable';
import { Observable, Subject, Subscription } from 'rxjs';
import { GameData } from './game-data.model';
@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private consumer: any;
  receivedSubject: Subject<GameData> = new Subject<GameData>();

  constructor() {
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
          subscriber.next(data);
        }
      });

      return () => {
        channel.unsubscribe();
      }
    });
    return game$;
  }
}
