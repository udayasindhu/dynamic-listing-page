import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/models/UserProfile';

@Component({
  selector: 'userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  @Input() userProfile: Array<UserProfile> = new Array<UserProfile>();
  userName: string = '';
  userRole: string = '';
  userImage: string = '';

  constructor() { }

  ngOnInit(): void {
    this.userName = `${this.userProfile[0].user.firstName} ${this.userProfile[0].user.lastName}`;
    this.userRole = this.userProfile[0].team.teamName;
    this.userImage = this.userProfile[0].user.profilePicture;
  }

}
