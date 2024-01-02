import { Component, Input, OnInit } from '@angular/core';
import { PriorityType, StatusType, getPriorityColor, getStatusColor } from 'src/app/utils/BadgeColorResolver';

@Component({
  selector: 'badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {

  @Input() badgeData: any = {};
  @Input() badgeKey: string = "";
  badgeContent: string = '';
  badgeType: string = '';


  constructor() { }

  ngOnInit(): void {
    this.getBadgeContent();
    this.getBadgeStyle();
  }

  getBadgeContent() {
    this.badgeContent = this.badgeData[this.badgeKey];
  }

  getBadgeStyle() {
    let badgeColor: string = '';
    let priorityKey = Object.keys(this.badgeData).filter(key => key.toLowerCase().includes('priority'))[0];
    if (this.badgeKey.toLowerCase().includes('status')) {
      badgeColor = getStatusColor(this.badgeContent.toUpperCase() as StatusType, this.badgeData[priorityKey] as PriorityType);
    } else {
      badgeColor = getPriorityColor(this.badgeContent as PriorityType);
    }
    return `border-${badgeColor}-500 text-${badgeColor}-500 bg-${badgeColor}-100 border p-1 rounded inline-block max-w-max ml-3 mr-6 text-xs font-normal w-40`;
  }
}
