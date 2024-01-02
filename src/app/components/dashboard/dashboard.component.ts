import { Component, OnInit } from '@angular/core';
import { BreadCrumbs } from 'src/app/constants/BreadCrumbs';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private breadcrumbsService: BreadcrumbsService) { }


  ngOnInit(): void {
    this.breadcrumbsService.setBreadcrumbs([BreadCrumbs.DASHBOARD]);
  }

}
