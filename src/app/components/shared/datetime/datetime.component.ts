import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.css'],
  providers: [DatePipe]
})
export class DatetimeComponent implements OnInit {

  @Input() dateTime: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
