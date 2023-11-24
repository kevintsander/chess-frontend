import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GameComponent } from './game/game.component';
import { UnitComponent } from './unit/unit.component';
import { SquareComponent } from './board/square.component';
import { StoreModule } from '@ngrx/store';
import { boardUserReducer } from './state/board-user.reducer';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
    UnitComponent,
    SquareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ boardUser: boardUserReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
