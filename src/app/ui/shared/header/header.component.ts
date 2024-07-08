import { Component, OnInit } from '@angular/core';
import { UserState } from '../../../state/user/user.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '../../../state/user/user.selectors';
import { User } from '../../../state/user/user.model';
import { CommonModule } from '@angular/common';
import { UserActions } from '../../../state/user/user.actions';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { GameState } from '../../../state/game/game.state';
import { GameActions } from '../../../state/game/game.actions';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { selectGameId } from '../../../state/game/game.selectors';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        RouterLink,
        MatIconModule,
        MatInputModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    providers: [

        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ]
})
export class HeaderComponent implements OnInit {
    user$?: Observable<User | null>;
    gameId$?: Observable<string | undefined>;

    constructor(private userStore: Store<UserState>, private gameStore: Store<GameState>) { }

    ngOnInit(): void {
        this.user$ = this.userStore.select(selectUser);
    }

    logoutClick(): void {
        this.userStore.dispatch(UserActions.logout());
    }

    createGameClick(): void {
        this.gameStore.dispatch(GameActions.createGame());
    }

}
