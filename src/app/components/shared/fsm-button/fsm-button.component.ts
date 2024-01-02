import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fsm-button',
  templateUrl: './fsm-button.component.html',
  styleUrls: ['./fsm-button.component.css']
})
export class FsmButtonComponent implements OnInit {

  @Input()
  buttonText: string = '';
  @Input()
  buttonIcon: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
