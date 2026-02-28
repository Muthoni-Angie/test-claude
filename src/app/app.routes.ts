import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ShellComponent } from './layout/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientsListComponent } from './pages/clients/clients-list.component';
import { ClientDetailsComponent } from './pages/clients/client-details.component';
import { IntakeFormComponent } from './pages/intake/intake-form.component';
import { AssessmentFormComponent } from './pages/assessment/assessment-form.component';
import { ProgressCheckinComponent } from './pages/progress/progress-checkin.component';
import { ExitFormComponent } from './pages/exit-form/exit-form.component';
import { ServiceDeliveryPlanComponent } from './pages/service-delivery/service-delivery-plan.component';
import { RegisterClientComponent } from './pages/register/register-client.component';
import { EditClientComponent } from './pages/clients/edit-client.component';
import { authGuard } from './core/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'clients',
        component: ClientsListComponent
      },
      {
        path: 'clients/new',
        component: RegisterClientComponent
      },
      {
        path: 'clients/:id',
        component: ClientDetailsComponent
      },
      {
        path: 'clients/:id/edit',
        component: EditClientComponent
      },
      {
        path: 'clients/:id/intake',
        component: IntakeFormComponent
      },
      {
        path: 'clients/:id/assessment',
        component: AssessmentFormComponent
      },
      {
        path: 'clients/:id/progress',
        component: ProgressCheckinComponent
      },
      {
        path: 'clients/:id/service-delivery',
        component: ServiceDeliveryPlanComponent
      },
      {
        path: 'clients/:id/exit',
        component: ExitFormComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

