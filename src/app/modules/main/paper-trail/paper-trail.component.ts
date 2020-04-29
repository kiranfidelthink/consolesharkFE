import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/shared-service/user-service';


@Component({
  selector: "app-paper-trail",
  templateUrl: "./paper-trail.component.html",
  styleUrls: ["./paper-trail.component.css"]
})
export class PaperTrailComponent implements OnInit {
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  data: any;
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.getPaperTrail();
}

  constructor(private route:Router, private _userService:UserService) {}

  getPaperTrail() {
    this._userService.getPaperTrailLog().subscribe((res:any) => {
     console.log("paper trail", res)
     this.data = res
     
    });
  }
  
  // ngOnInit() {
  // }
  
  
}
