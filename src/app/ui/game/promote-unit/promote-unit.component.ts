import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState } from '../../../state/game/game.state';
import { GameActions } from '../../../state/game/game.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-promote-unit',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './promote-unit.component.html',
    styleUrls: ['./promote-unit.component.scss']
})
export class PromoteUnitComponent {
    @Output() selectUnit: EventEmitter<string> = new EventEmitter();
    selectedUnitType: string = 'Queen';

    constructor(private store: Store<GameState>) {
    }

    onOk() {
        if (this.selectedUnitType) {
            this.store.dispatch(GameActions.promoteUnit({ unitType: this.selectedUnitType }));
        }
    }
}
