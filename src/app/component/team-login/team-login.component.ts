import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-team-login',
  templateUrl: './team-login.component.html',
  styleUrls: ['./team-login.component.scss'],
  providers: [MessageService]
})
export class TeamLoginComponent implements OnInit {
  subheader: string = "Login Form";
  header: string = "Team Login Form";
  userform: FormGroup | any;
  submitted: boolean = false;
  dataType = "password";
  blockSpace: RegExp = /[^\s]/;
  passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  user: any;
  MemberData: any[] = [];


  get genInfoForm() {
    return this.userform.controls;
  }

  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private Api: AccountService,
    private router: Router,
  ) {
   

  }

  ngOnInit() {
    window.onpopstate = function (e) { window.history.forward(); }
    
    this.userform = this.fb.group({
      'c_memberId': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  onKeyDownEvent(event: any) {
    if (
      (event.keyCode >= 48 && event.keyCode <= 57) ||
      (event.keyCode >= 96 && event.keyCode <= 105) ||
      (event.keyCode >= 106 && event.keyCode <= 111) ||
      (event.keyCode >= 144 && event.keyCode <= 222) ||
      event.keyCode == 13
    ) {
      event.preventDefault();
    }
  }


  onSubmit() {
    console.log('this.userform', this.userform);
    this.submitted = true;
    if (this.userform.valid) {
      if (sessionStorage.getItem('MemberData')) {
        const newLocal: any = sessionStorage.getItem('MemberData') ? sessionStorage.getItem('MemberData') : '';
        this.MemberData = JSON.parse(newLocal);
       
        if(this.MemberData.find(res => res.c_memberId == this.userform.value.c_memberId
          && res.c_password == this.userform.value.password)){
            this.messageService.add({
              severity: 'success', summary: 'Success',
              detail: 'Member login successfully'
            });

            setTimeout(() => {
              this.router.navigateByUrl("/team-dashboard");
            }, 2000);
        } else {
          this.messageService.add({
            severity: 'error', summary: 'Error',
            detail: 'Invalid login'
          });
        }


      } else {
        this.messageService.add({
          severity: 'error', summary: 'Error',
          detail: 'Invalid login'
        });
      }
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Error',
        detail: 'Please fill all required fields.'
      });
    }
  }

}
