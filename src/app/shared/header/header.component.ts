import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private routes: Router) { }

  ngOnInit(): void {
  }
  logout(){
     localStorage.removeItem('organizationDetails');
    localStorage.removeItem('jwtToken');
    this.routes.navigate(['/']);
  }
}
