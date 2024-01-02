import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { Icons } from 'src/app/constants/Icons';

interface NavItem {
  label: string;
  iconPath: string;
  ignoreClick: boolean;
}

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  navItems: NavItem[] = [
    { label: 'Logo', iconPath: Icons.LOGO, ignoreClick: true },
    { label: 'Dashboard', iconPath: Icons.DASHBOARD, ignoreClick: false },
    { label: 'Jobs', iconPath: Icons.JOBS, ignoreClick: false },
    { label: 'Settings', iconPath: Icons.SETTINGS, ignoreClick: false },
  ];

  constructor(private breadcrumbsService: BreadcrumbsService) {
  }

  ngOnInit(): void {
    this.breadcrumbsService.setBreadcrumbs(['Dashboard']);
  }

}
