import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './ui/game/game.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { gameReducer } from './state/game/game.reducer';
import { GameEffects } from './state/game/game.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AngularTokenModule } from '@kevintsander/angular-token';
import { HeaderComponent } from './ui/shared/header/header.component';
import { userReducer } from './state/user/user.reducer';
import { UserEffects } from './state/user/user.effects';
import { LoginComponent } from './ui/user/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './ui/user/sign-up/sign-up.component';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { SharedEffects } from './state/shared/shared.effects';
import { sharedReducer } from './state/shared/shared.reducer';
import { ToastListComponent } from './ui/shared/toast/toast-list.component';


@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
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
        StoreRouterConnectingModule.forRoot()], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
