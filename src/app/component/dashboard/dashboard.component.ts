import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  header = "Dashboard";
  cols: any;
  @ViewChild('dataTable') private dataTable: any;
  EmpData: any[]=[];
  
  constructor() {
    if (sessionStorage.getItem('EmpData')) {
      const newLocal: any = sessionStorage.getItem('EmpData') ? sessionStorage.getItem('EmpData') : '';
      this.EmpData = JSON.parse(newLocal);
    } else {
      this.EmpData = [];
    }
 
  }

  ngOnInit(): void {
    window.onpopstate = function (e) { window.history.forward(); }
    this.cols = [
      { field: 'c_empId', header: 'Emp Id', width: '70px' },
      { field: 'c_name', header: 'Emp Name', width: '70px' },
      { field: 'c_gender', header: 'Gender', width: '10px' },
      { field: 'n_dob', header: 'DOB', width: '50px' },
      { field: 'c_mobile_no', header: 'Mobile No', width: '70px' },
      { field: 'c_emailid', header: 'Email', width: '50px' },
      { field: 'c_address', header: 'Address', width: '60px' },
      { field: 'n_state', header: 'State', width: '30px' },
      { field: 'n_district', header: 'District', width: '30px' },
      { field: 'n_city', header: 'City', width: '30px' },
      { field: 'n_pincode', header: 'Pincode', width: '20px' }
    ];

  }

}
