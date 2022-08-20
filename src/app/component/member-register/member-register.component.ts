import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-member-register',
  templateUrl: './member-register.component.html',
  styleUrls: ['./member-register.component.scss'],
  providers: [MessageService]
})
export class MemberRegisterComponent implements OnInit {
  subheader: string = "Register Form";
  header: string = "Team Member";
  maxDate = new Date(moment().subtract(18, 'year').format('MM/DD/YYYY'));
  registerform: FormGroup | any;
  submitted: boolean = false;
  dataType: any = 'password';
  phonevalid = false;
  MemberData: any[] = [];

  get form() {
    return this.registerform.controls;
  }

  constructor(private fb: FormBuilder, public datepipe: DatePipe, private router: Router, private messageService: MessageService) {

  }


  phone(event?: any): any {
    let phone = [];
    if (this.registerform.get('c_mobile_no').value != undefined) {
      phone.push(this.registerform.get('c_mobile_no').value);
      if (phone[0] < 6) {

        this.registerform.get('c_mobile_no').patchValue('');
        this.registerform.get('c_mobile_no').updateValueAndValidity();
        phone = [];
      }
      console.log('ewr', this.registerform.get('c_mobile_no').value);
    }
  }

  ngOnInit() {
    window.onpopstate = function (e) { window.history.forward(); }

    this.registerform = this.fb.group({
      'c_name': ["", Validators.required],
      'n_dob': ["", Validators.required],
      'c_memberId': ["", Validators.required],
      'c_gender': ["", Validators.required],
      'c_role': ["", Validators.required],
      'c_mobile_no': ["", Validators.compose([Validators.required, Validators.pattern(/^[0-9]{10}$/)])],
      'c_emailid': ["", Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      'c_password': ["", Validators.required],
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
    this.submitted = true;

    if (this.registerform.get('n_dob').value) {
      let date = this.datepipe.transform(this.registerform.get('n_dob').value, 'yyyy-MM-dd');
      this.registerform.get('n_dob').patchValue(date);
      this.registerform.get('n_dob').updateValueAndValidity();
    }

    console.log("submit", this.registerform.value);
    if (this.registerform.valid) {
      if (sessionStorage.getItem('MemberData')) {
        const newLocal: any = sessionStorage.getItem('MemberData') ? sessionStorage.getItem('MemberData') : '';
        this.MemberData = JSON.parse(newLocal);
      } else {
        this.MemberData = [];
      }

      this.MemberData.push(this.registerform.value);
      sessionStorage.setItem('MemberData', JSON.stringify(this.MemberData));

      this.messageService.add({
        severity: 'success', summary: 'Success',
        detail: 'Team Member created successfully'
      });

      setTimeout(() => {
        this.router.navigateByUrl("/emp-dashboard");
      }, 2000);

    } else {
      this.messageService.add({
        severity: 'error', summary: 'Error',
        detail: 'Please fill all required fields.'
      });
    }
  }


}
