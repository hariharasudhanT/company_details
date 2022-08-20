import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EmpDashboardComponent } from './component/emp-dashboard/emp-dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { M8itsolutionComponent } from './component/m8itsolution/m8itsolution.component';
import { MemberRegisterComponent } from './component/member-register/member-register.component';
import { RegisterComponent } from './component/register/register.component';
import { TeamLoginComponent } from './component/team-login/team-login.component';
import { TeamMemberComponent } from './component/team-member/team-member.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'team-login', component: TeamLoginComponent },
  { path: 'team-dashboard', component: TeamMemberComponent },
  { path: 'm8itsolutions' ,component: M8itsolutionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-member', component: MemberRegisterComponent },
  { path: 'emp-dashboard', component: EmpDashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', pathMatch: 'full', redirectTo: 'm8itsolutions' },
  { path: '**', pathMatch: 'full', redirectTo: 'm8itsolutions' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
