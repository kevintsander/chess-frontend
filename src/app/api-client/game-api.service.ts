import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { DataGame } from './data-game.model';

@Injectable({
    providedIn: 'root'
})
export class GameApiService {

    chessApiGamesUrl: string = `${environment.chessApiUrl}/games/`
    constructor(private http: HttpClient) { }

    getGame(id: string): Observable<DataGame> {
        const getUrl = `${this.chessApiGamesUrl}/${id}`
        return this.http.get<DataGame>(getUrl);
    }
}
