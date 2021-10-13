import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { PlanFormComponent } from './pages/plan-form/plan-form.component';
import { from } from 'rxjs';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/';
import { environment } from 'src/environments/environment';
import { AsignacionPlanComponent } from './pages/asignacion-plan/asignacion-plan.component';
import { MaterialModule } from './material.module';
import { ListadoUsuariosComponent } from './pages/listado-usuarios/listado-usuarios.component';
import { ModificarUsuariosComponent } from './pages/modificar-usuarios/modificar-usuarios.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NetworkInterceptor } from './services/interceptors/network.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    TableComponent,
    DashboardComponent,
    FormUserComponent,
    LoginFormComponent,
    PopUpComponent,
    PlanFormComponent,
    AsignacionPlanComponent,
    ListadoUsuariosComponent,
    ModificarUsuariosComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [PopUpComponent],

})
export class AppModule { }
