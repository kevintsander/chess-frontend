import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { gameReducer } from './game/state/game.reducer';
import { GameEffects } from './game/state/game.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AngularTokenModule } from '@kevintsander/angular-token';
import { HeaderComponent } from './header/header.component';
import { userReducer } from './user/state/user.reducer';
import { UserEffects } from './user/state/user.effects';
import { LoginComponent } from './user/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ game: gameReducer, user: userReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      connectInZone: true
    }),
    EffectsModule.forRoot([GameEffects, UserEffects]),
    AngularTokenModule.forRoot({ apiBase: environment.chessApiUrl }),
    HeaderComponent,
    GameComponent,
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
