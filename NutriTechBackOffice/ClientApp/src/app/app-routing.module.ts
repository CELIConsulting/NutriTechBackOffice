import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { AppComponent } from './app.component';
import { UserLoginGuard } from './user-login.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  },
  {
    path: 'home',
    canActivate: [UserLoginGuard],
    component: HomeComponent
  
  },
  {
    path: 'user-form',
    component: FormUserComponent,
    canActivate: [UserLoginGuard],
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
