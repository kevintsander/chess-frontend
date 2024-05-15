import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap, withLatestFrom } from 'rxjs';
import { GameState } from '../state/game/game.state';
import { Player } from './player.model';
import { PlayerActions } from '../state/game/game.actions';
import { selectCurrentColor, selectCurrentPlayer, selectPlayer1, selectPlayer2 } from '../state/game/game.selector';
import { LoginComponent } from '../user/login/login.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-player',
    standalone: true,
    imports: [
        LoginComponent,
        CommonModule
    ],
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {
    @Input({ required: true }) playerNum!: number;

    player$!: Observable<Player | null>;
    currentColorSub!: Subscription;
    isCurrentColor: boolean = false;

    constructor(private gameStore: Store<GameState>) { }

    ngOnInit(): void {
        if (this.playerNum === 1) {
            this.player$ = this.gameStore.select(selectPlayer1);
        }
        else if (this.playerNum === 2) {
            this.player$ = this.gameStore.select(selectPlayer2);
        }
        this.currentColorSub = this.gameStore.select(selectCurrentColor).subscribe({
            next: (currentColor) => {
                this.isCurrentColor = this.playerNum === 1 && currentColor === 'white' || this.playerNum === 2 && currentColor === 'black';
            }
        });
    }

    onClick() {
        this.gameStore.dispatch(PlayerActions.startSetPlayer({ playerNum: this.playerNum }));
    }

    ngOnDestroy() {
        this.currentColorSub.unsubscribe();
    }

}
