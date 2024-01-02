import { Component, OnInit } from '@angular/core';
import { BreadCrumbs } from 'src/app/constants/BreadCrumbs';
import { BreadcrumbsService } from 'src/app/services/breadcrumbs.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private breadcrumbsService: BreadcrumbsService) { }


  ngOnInit(): void {
    this.breadcrumbsService.setBreadcrumbs([BreadCrumbs.SETTIGNS]);
  }

}
