// hero-area.component.ts
import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'hero-area',
  templateUrl: './hero-area.component.html',
  styleUrls: ['./hero-area.component.css'],
})
export class HeroAreaComponent implements OnInit {
  breadcrumbs: string[] = [];

  constructor(private breadcrumbsService: BreadcrumbsService) { }

  ngOnInit(): void {
    this.breadcrumbsService.breadcrumbs$.subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
