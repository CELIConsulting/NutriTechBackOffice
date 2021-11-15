import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { PlanFormComponent } from './pages/plan-form/plan-form.component';
import { AppComponent } from './app.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { UserLoginGuard } from './user-login.guard';
import { AsignacionPlanComponent } from './pages/asignacion-plan/asignacion-plan.component';
import { ListadoUsuariosComponent } from './pages/listado-usuarios/listado-usuarios.component';
import { ActivatedRoute, Params } from '@angular/router';
import { ModificarUsuariosComponent } from './pages/modificar-usuarios/modificar-usuarios.component';
import { PatientHistoryComponent } from './pages/patient-history/patient-history.component';
import { ListadoPlanesComponent } from './pages/listado-planes/listado-planes.component';
import { ModificarPlanesComponent } from './pages/modificar-planes/modificar-planes.component';
import { ProgresoPacienteComponent } from './pages/progreso-paciente/progreso-paciente.component';



const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([""]);

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'user-form',
    component: FormUserComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'plan-form',
    component: PlanFormComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'asignacion-plan',
    component: AsignacionPlanComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: 'listado-usuarios',
    component: ListadoUsuariosComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: 'listado-planes',
    component: ListadoPlanesComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: 'modificar-usuarios/:email/:rol',
    component: ModificarUsuariosComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'patient-history/:email',
    component: PatientHistoryComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'modificar-planes/:nombre',
    component: ModificarPlanesComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'progreso-paciente/:email',
    component: ProgresoPacienteComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
