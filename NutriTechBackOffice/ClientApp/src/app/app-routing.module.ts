import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginGuard } from './guards/user-login.guard';
import { AsignacionPlanComponent } from './pages/asignacion-plan/asignacion-plan.component';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoPlanesComponent } from './pages/listado-planes/listado-planes.component';
import { ListadoUsuariosComponent } from './pages/listado-usuarios/listado-usuarios.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { ModificarPlanesComponent } from './pages/modificar-planes/modificar-planes.component';
import { ModificarUsuariosComponent } from './pages/modificar-usuarios/modificar-usuarios.component';
import { PatientHistoryComponent } from './pages/patient-history/patient-history.component';
import { PlanFormComponent } from './pages/plan-form/plan-form.component';
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
    canActivate: [UserLoginGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'user-form',
    component: FormUserComponent,
    canActivate: [UserLoginGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'plan-form',
    component: PlanFormComponent,
    canActivate: [UserLoginGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'asignacion-plan',
    component: AsignacionPlanComponent,
    canActivate: [UserLoginGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: 'listado-usuarios',
    component: ListadoUsuariosComponent,
    canActivate: [UserLoginGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: 'listado-planes',
    component: ListadoPlanesComponent,
    canActivate: [UserLoginGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },

  {
    path: 'modificar-usuarios/:email/:rol',
    component: ModificarUsuariosComponent,
    canActivate: [UserLoginGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'patient-history/:email',
    component: PatientHistoryComponent,
    canActivate: [UserLoginGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'modificar-planes/:nombre',
    component: ModificarPlanesComponent,
    canActivate: [UserLoginGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'progreso-paciente/:email',
    component: ProgresoPacienteComponent,
    canActivate: [UserLoginGuard],
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
