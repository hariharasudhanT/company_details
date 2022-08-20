import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { EmailValidator } from 'src/app/contracts/email.valitations';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  subheader: string = "Create a Employee Form";
  header: string;
  maxDate = new Date(moment().subtract(18, 'year').format('MM/DD/YYYY'));
  registerform: FormGroup | any;
  submitted: boolean = false;
  stateList: any;
  blockSpace: RegExp = /[^\s]/;
  blockSpecial: RegExp = /^[^<>*!]+$/;
  Hobbieslist: any;
  Hobbies: any[] = [];
  HobbiesStringlist: any;
  districtlist: any;
  citylist: any;
  dataType: any = 'password';
  phonevalid = false;
  EmpData: any[] = [];

  get form() {
    return this.registerform.controls;
  }

  constructor(private fb: FormBuilder, private Api: AccountService, public datepipe: DatePipe, private router: Router, private messageService: MessageService) {
    this.header = sessionStorage.getItem('user') == 'Admin' ? 'Management Register From' : 'Employee Register From';
  }

  numberOnly(event?: any): any {
    if (
      (event?.keyCode >= 48 && event?.keyCode <= 57) ||
      (event?.keyCode >= 96 && event?.keyCode <= 105) ||
      event?.keyCode == 8 ||
      event?.keyCode == 37 ||
      event?.keyCode == 39 ||
      event?.keyCode == 46 ||
      event?.keyCode == 13 ||
      event?.keyCode == 9
    ) {
      return true;
    }
    event.preventDefault();
  }

  phone(event?: any): any {
    console.log("event", event);

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
      'c_empId': ["", Validators.required],
      'c_gender': ["", Validators.required],
      'n_state': ["", Validators.required],
      'n_district': ["", Validators.required],
      'n_city': ["", Validators.required],
      'n_pincode': ["", Validators.required],
      'c_address': ["", Validators.required],
      'c_mobile_no': ["", Validators.compose([Validators.required, Validators.pattern(/^[0-9]{10}$/)])],
      'c_emailid': ["", Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      'c_password': ["", Validators.required],
    });

    this.Api.statelist().subscribe(res => {
      console.log('state', res);
      this.stateList = res;
    });

  }



  stateChanged() {
    this.stateList?.data?.map((res: any) => {
      if (res.state_name == this.registerform.get('n_state').value) {
        this.Api.districtlist(res?.state_id).subscribe(res => {
          console.log('districtlist', res);
          this.districtlist = res;
        });
      }
    });
  }

  districtChanged() {
    this.districtlist?.data?.map((res: any) => {
      if (res.district_name == this.registerform.get('n_district').value) {
        this.Api.citylist(res?.district_id).subscribe(res => {
          console.log('citylist', res);
          this.citylist = res;
        });
      }
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
      if (sessionStorage.getItem('EmpData')) {
        const newLocal: any = sessionStorage.getItem('EmpData') ? sessionStorage.getItem('EmpData') : '';
        this.EmpData = JSON.parse(newLocal);
      } else {
        this.EmpData = [];
      }

      this.EmpData.push(this.registerform.value);
      sessionStorage.setItem('EmpData', JSON.stringify(this.EmpData));
      sessionStorage.setItem("user", 'Login');

      this.messageService.add({
        severity: 'success', summary: 'Success',
        detail: 'Employee created successfully'
      });

      setTimeout(() => {
        this.router.navigateByUrl("/dashboard");
      }, 1000);

    } else {
      this.messageService.add({
        severity: 'error', summary: 'Error',
        detail: 'Please fill all required fields.'
      });
    }
  }


}
