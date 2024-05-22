import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { NotFoundComponent } from './status/not-found/not-found.component';
import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, outlet: 'dialog' },
  { path: 'signup', component: SignUpComponent, outlet: 'dialog' },
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
