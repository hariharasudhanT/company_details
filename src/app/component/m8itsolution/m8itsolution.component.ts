import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-m8itsolution',
  templateUrl: './m8itsolution.component.html',
  styleUrls: ['./m8itsolution.component.scss']
})
export class M8itsolutionComponent implements OnInit {
  header: string = "M8itsolutions";
  constructor(  private router: Router) { }

  ngOnInit(): void {
  }

  login(port?:any){
    console.log("port", port);
    sessionStorage.setItem("user", port);
    this.router.navigateByUrl("/login")
  }

}
