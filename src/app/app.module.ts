import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import {KeyFilterModule} from 'primeng/keyfilter';
import { DatePipe } from '@angular/common';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { NgxOtpInputModule } from 'ngx-otp-input';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import { M8itsolutionComponent } from './component/m8itsolution/m8itsolution.component';
import {CardModule} from 'primeng/card';
import { EmpDashboardComponent } from './component/emp-dashboard/emp-dashboard.component';
import { TeamMemberComponent } from './component/team-member/team-member.component';
import { TeamLoginComponent } from './component/team-login/team-login.component';
import { MemberRegisterComponent } from './component/member-register/member-register.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    M8itsolutionComponent,
    EmpDashboardComponent,
    TeamMemberComponent,
    TeamLoginComponent,
    MemberRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    PasswordModule,
    KeyFilterModule,
    NgxOtpInputModule,
    ToastModule,
    TableModule,
    CardModule
  ],
  exports: [
    RouterModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [],
  providers: [DatePipe,DialogService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
