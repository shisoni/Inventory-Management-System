import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
    { path: 'home',  loadChildren: () => import('./home/home.module').then((m) => m.HomeModule), canActivate: [AuthGuard] },
    { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)},

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule {}