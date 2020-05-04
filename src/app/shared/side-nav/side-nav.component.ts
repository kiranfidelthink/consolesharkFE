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

  ngOnInit(){}
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
  goToHostManagement() {
    // console.log("Inside host management")
    this.routes.navigate(['/host-management']);
  }
  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    classname: 'min-vh-100 p-3',
    listBackgroundColor: `#2f3337`,
    fontColor: `#9d9fa1`,
    backgroundColor: `#2f3337`,
    selectedListFontColor: `#fff`,
    highlightOnSelect: true,
    collapseOnSelect: true,
    rtlLayout: false,
  };
  expandCollapseStatus = 'expand';
  appitems = [
    {
      label: 'Consoleshark',
      imageIcon: '../../../assets/img/favicon_96x96.png',
      link: 'https://dev.dashboard.consoleshark.com',
      externalRedirect: true,
      hrefTargetType: '_blank', // _blank|_self|_parent|_top|framename
    },
    {
      label: 'Overview',
      disabled: true,
    },
    {
      label: 'Dashboard',
      link: '/',
      icon: 'dashboard',
      activeIcon: 'favorite',
      expanded: true,
      // onSelected: function () {
      //   console.log('Item 3');
      // },
    },
    {
      label: 'NOC Screen',
      link: '/',
      icon: 'tv',
      expanded: true,
      onSelected: function () {
        console.log('Item 3');
      },
    },
    {
      label: 'Sessions',
      link: '/',
      icon: 'person',
      expanded: true,
      onSelected: function () {
        console.log('Item 3');
      },
    },
    {
      label: 'Configuration',
      disabled: true,
    },
    {
      label: 'Host Management',
      icon: 'dns',
      items: [
        {
          label: 'Managed Host',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
        },
        {
          label: 'Site Management',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'Security Policies',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
      ],
    },
    {
      label: 'Shark Management',
      icon: 'settings_input_composite',
      items: [
        {
          label: 'Application Management',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
        },
        {
          label: 'Dongle Management',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'Power Management',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'Sensor Management',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
      ],
    },
    {
      label: 'Reporting',
      icon: 'description',
      items: [
        {
          label: 'Alerting and SMS',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
        },
        {
          label: 'Generate Report',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'Scheduled Reporting',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'Reporting Policies',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
      ],
    },
    {
      label: 'Organization',
      icon: 'person',
      items: [
        {
          label: 'Account Details',
          link: '/organization/account-details',
          activeIcon: 'favorite',
          expanded: true,
        },
        {
          label: 'Authentication',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'Billing',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'Organization',
          link: '/organization/organization',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'User management',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'Paper Trail',
          link: '/organization/paper-trail',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
      ],
    },
    {
      label: 'Partners',
      icon: 'thumb_up',
      items: [
        {
          label: 'Customers',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
        },
        {
          label: 'Commerce',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'Partner Settings',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'Reporting',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'User Management',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
      ],
    },
    {
      label: 'Providers',
      icon: 'build',
      items: [
        {
          label: 'Account Details',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
        },
        {
          label: 'Billing',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'user management',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
        {
          label: 'Security Policies',
          link: '/',
          activeIcon: 'favorite',
          expanded: true,
          navigationExtras: {
            queryParams: { order: 'popular', filter: 'new' },
          },
        },
      ],
    },
    {
      label: 'Support',
      disabled: true,
    },
    {
      label: 'Create Case',
      link: '/',
      icon: 'confirmation_number',
      expanded: true,
    },
    {
      label: 'manage Case',
      link: '/',
      icon: 'confirmation_number',
      expanded: true,
    },
    {
      label: 'Feature Request',
      link: '/',
      icon: 'emoji_objects',
      expanded: true,
    },
  ];
  selectedItem($event) {
    console.log('click', $event);
  }
}
