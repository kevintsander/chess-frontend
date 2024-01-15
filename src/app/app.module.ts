import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { UserModule } from './user/user.module';
import { PlayerComponent } from './player/player.component';
import { playerReducer } from './player/state/player.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { PlayerEffects } from './player/state/player.effects';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
    UnitComponent,
    SquareComponent,
    PromoteUnitComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    UserModule,
    StoreModule.forRoot({ game: gameReducer, players: playerReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([GameEffects, PlayerEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
