import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { NotFoundComponent } from './status/not-found/not-found.component';

const routes: Routes = [
  { path: 'games', component: GameComponent },
  { path: 'games/:gameId', component: GameComponent },
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
