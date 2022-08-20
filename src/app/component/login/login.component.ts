import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  subheader: string = "Login Form";
  header: string;
  userform: FormGroup | any;
  submitted: boolean = false;
  dataType = "password";
  blockSpace: RegExp = /[^\s]/;
  passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  user: any;
  EmpData: any[] = [];


  get genInfoForm() {
    return this.userform.controls;
  }

  constructor(private fb: FormBuilder,
    private messageService: MessageService,
    private Api: AccountService,
    private router: Router,
  ) {
    this.user = sessionStorage.getItem('user');
    this.header = sessionStorage.getItem('user') == 'Admin' ? 'Management Login From' : 'Employee Login From';

  }

  ngOnInit() {
    window.onpopstate = function (e) { window.history.forward(); }
    
    this.userform = this.fb.group({
      'username': ['', Validators.required],
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

  // 	hari@m8talents.com

  onSubmit() {
    console.log('this.userform', this.userform);

    this.submitted = true;
    if (this.userform.valid) {
      if (this.user == 'Admin') {
        if (this.userform.value.username == 'M8itsolutions' && this.userform.value.password == 'Hari#123') {
          this.router.navigateByUrl("/dashboard")
        } else {
          this.messageService.add({
            severity: 'error', summary: 'Error',
            detail: 'Invalid login'
          });
        }

      } else if (this.user == 'Login') {
        if (sessionStorage.getItem('EmpData')) {
          const newLocal: any = sessionStorage.getItem('EmpData') ? sessionStorage.getItem('EmpData') : '';
          this.EmpData = JSON.parse(newLocal);
         
          if(this.EmpData.find(res => res.c_empId == this.userform.value.username
            && res.c_password == this.userform.value.password)){
              this.messageService.add({
                severity: 'success', summary: 'Success',
                detail: 'Employee login successfully'
              });

              setTimeout(() => {
                this.router.navigateByUrl("/emp-dashboard");
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
      }
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Error',
        detail: 'Please fill all required fields.'
      });
    }
  }

}
