import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { PlanFormComponent } from './pages/plan-form/plan-form.component';
import { AppComponent } from './app.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { UserLoginGuard } from './user-login.guard';
import { AsignacionPlanComponent } from './pages/asignacion-plan/asignacion-plan.component';

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  },
  {
    path: 'home',
    canActivate: [AngularFireAuthGuard],
    component: HomeComponent
  
  },
  {
    path: 'user-form',
    component: FormUserComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'plan-form',
    component: PlanFormComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'asignacion-plan',
    component: AsignacionPlanComponent,
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
