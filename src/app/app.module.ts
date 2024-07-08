import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { gameReducer } from './state/game/game.reducer';
import { GameEffects } from './state/game/game.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AngularTokenModule } from '@kevintsander/angular-token';
import { HeaderComponent } from './header/header.component';
import { userReducer } from './state/user/user.reducer';
import { UserEffects } from './state/user/user.effects';
import { LoginComponent } from './user/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { SharedEffects } from './state/shared/shared.effects';
import { sharedReducer } from './state/shared/shared.reducer';
import { ToastListComponent } from './toast/toast-list.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      shared: sharedReducer,
      router: routerReducer,
      user: userReducer,
      game: gameReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      connectInZone: true
    }),
    EffectsModule.forRoot([SharedEffects, GameEffects, UserEffects]),
    StoreRouterConnectingModule.forRoot(),
    AngularTokenModule.forRoot({ apiBase: environment.chessApiUrl }),
    HeaderComponent,
    GameComponent,
    LoginComponent,
    SignUpComponent,
    ToastListComponent,
    BrowserAnimationsModule,
    StoreRouterConnectingModule.forRoot(),
    // StoreRouterConnectingModule.forRoot({
    //   serializer: CustomSerializer
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
