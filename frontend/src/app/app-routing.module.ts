import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewAlertComponent } from './new-alert/new-alert.component';
import { AlertsComponent } from './alerts/alerts.component';

const routes: Routes = [
  {path: "", component: AlertsComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "new-alert", component: NewAlertComponent},
  {path: "alerts", component: AlertsComponent},
  {path: "**", component: AlertsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
