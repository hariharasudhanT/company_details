import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss']
})
export class EmpDashboardComponent implements OnInit {
  header = "Employee Dashboard";
  cols: any;
  @ViewChild('dataTable') private dataTable: any;
  MemberData: any[] = [];

  constructor() {
    if (sessionStorage.getItem('MemberData')) {
      const newLocal: any = sessionStorage.getItem('MemberData') ? sessionStorage.getItem('MemberData') : '';
      this.MemberData = JSON.parse(newLocal);
    } else {
      this.MemberData = [];
    }
    console.log("MemberData", this.MemberData);

  }

  ngOnInit(): void {
    window.onpopstate = function (e) { window.history.forward(); }

    this.cols = [
      { field: 'c_memberId', header: 'Member Id', width: '70px' },
      { field: 'c_name', header: 'Member Name', width: '70px' },
      { field: 'c_gender', header: 'Gender', width: '10px' },
      { field: 'n_dob', header: 'DOB', width: '50px' },
      { field: 'c_role', header: 'Team Member Role', width: '70px' },
      { field: 'c_emailid', header: 'Email', width: '50px' },
      { field: 'c_mobile_no', header: 'Mobile', width: '50px' }
    ];
  }

}
