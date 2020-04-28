import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-paper-trail",
  templateUrl: "./paper-trail.component.html",
  styleUrls: ["./paper-trail.component.css"]
})
export class PaperTrailComponent implements OnInit {
  popularApps: any = [];
  newestApps: any = [];
  constructor(private route:Router) {}
  
  ngOnInit() {
  }
  
  
}
