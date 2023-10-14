import { Injectable } from '@angular/core';
import * as ActionCable from '@rails/actioncable';
import { Subject, Subscription } from 'rxjs';
import { Game } from './game/game.model';
@Injectable({
  providedIn: 'root'
})
export class ActionCableService {
  private consumer: any;
  receivedSubject: Subject<Game> = new Subject<Game>();

  constructor() { }

  subscribe(game_id: string) {
    this.consumer = ActionCable.createConsumer('http://localhost:3000/cable');
    this.consumer.subscriptions.create({ channel: 'GameChannel', game_id: game_id }, {
      connected: () => {
        console.log('connected!')
      },
      disconnected: () => {
        console.log('disconnected')
      },
      received: (data: any) => {
        this.receivedSubject.next(data.body);
      }

    })
  }

  getReceivedSubject(): Subject<Game> {
    return this.receivedSubject;
  }
}
