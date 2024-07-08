import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './ui/game/game.component';
import { NotFoundComponent } from './ui/shared/not-found/not-found.component';
import { LoginComponent } from './ui/user/login/login.component';
import { SignUpComponent } from './ui/user/sign-up/sign-up.component';

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
