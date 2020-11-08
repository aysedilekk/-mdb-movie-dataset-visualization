import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { MovieComponent } from './movie/movie.component'

import { AppAuthGuard } from "./app.auth.guard";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'movie', component: MovieComponent},
  // {path: 'movie', component: MovieComponent, canActivate: [AppAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
