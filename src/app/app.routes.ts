import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { EtudiantsComponent } from './pages/admin/etudiants/etudiants.component';
import { AbsencesComponent } from './pages/admin/absences/absences.component';
import { JustificationComponent } from './pages/admin/justifications/justifications.component';
import { SecurityComponent } from './pages/security/security.component';
import { LoginComponent } from './pages/security/login/login.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SessionsComponent } from './pages/admin/sessions/sessions.component';
import { SessionDetailsComponent } from './pages/admin/sessions/sessionsDetails/sessionDetails.component';
import { EtudiantAbsencesComponent } from './pages/admin/etudiants/listeAbsences/etudiantAbsences.component';
import { JustificationAbsencesComponent } from './pages/admin/justificationsAbsences/justificationsAbsences.component';
import { JustificationSessionsComponent } from './pages/admin/justificationsSessions/justificationsSessions.component';

export const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: 'etudiants', component: EtudiantsComponent },
      { path: 'etudiant/:etudiantId', component: EtudiantAbsencesComponent },
      { path: 'sessions', component: SessionsComponent },
      { path: 'absences', component: AbsencesComponent },
      { path: 'absences/session/:sessionId', component: SessionDetailsComponent },
      { path: 'justification/:justificationId', component: JustificationComponent },
      { path: 'etudiant/:etudiantId/absence/:absenceId/justification', component: JustificationAbsencesComponent },
      { path: 'session/:sessionId/absence/:absenceId/justification', component: JustificationSessionsComponent },
      { path: '', component: DashboardComponent }

    ]
  },
  {
    path: "security",
    component: SecurityComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  {
    path: '',
    redirectTo: '/security',
    pathMatch: 'full'
  }
];
