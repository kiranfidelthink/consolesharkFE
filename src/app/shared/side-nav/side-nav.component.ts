import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from '../animations/animations';
import { Router } from '@angular/router';
// import { SidenavService } from '../sharedService/sidenav.service';
// interface Page {
//   link: string;
//   name: string;
//   icon: string;
// }

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations: [onSideNavChange, animateText],
})
export class SidenavComponent implements OnInit {
  public sideNavState: boolean = true;
  public linkText: boolean = true;
  showChevronDown: boolean = false;
  constructor(private routes: Router) {}

  ngOnInit(): void {}
  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    // this._sidenavService.sideNavState$.next(this.sideNavState)
  }
  goToLogin() {
    this.routes.navigate(['/login']);
  }
  goToHostManagement(){
    // console.log("Inside host management")
    this.routes.navigate(["/host-management"]);
  }
}