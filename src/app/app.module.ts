import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './game/board/board.component';
import { GameComponent } from './game/game.component';
import { UnitComponent } from './game/unit/unit.component';
import { SquareComponent } from './game/board/square/square.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PromoteUnitComponent } from './game/promote-unit/promote-unit.component';
import { gameReducer } from './game/state/game.reducer';
import { GameEffects } from './game/state/game.effects';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
    UnitComponent,
    SquareComponent,
    PromoteUnitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ game: gameReducer }),
    EffectsModule.forRoot([GameEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
