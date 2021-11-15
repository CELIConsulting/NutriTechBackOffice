import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarGraphicComponent } from './components/bar-graphic/bar-graphic.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PiechartGridComponent } from './components/piechart-grid/piechart-grid.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from './material.module';
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
import { NetworkInterceptor } from './services/interceptors/network.interceptor';
import { NoDataResultComponent } from './components/no-data-result/no-data-result.component';
import { PopEliminarComponent } from './components/pop-eliminar/pop-eliminar.component';





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
    BarGraphicComponent,
    PiechartGridComponent,
    PatientHistoryComponent,
    ListadoPlanesComponent,
    ModificarPlanesComponent,
    NoDataResultComponent,
    PopEliminarComponent
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
    MaterialModule,
    NgxChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [PopUpComponent,PopEliminarComponent],

})
export class AppModule { }
