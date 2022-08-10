import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string;
  constructor(private userService: UsersService) { 
    this.setCurrentUsernama();
  }

  ngOnInit(): void {
  }

  setCurrentUsernama(){
    this.userService.getProfile().subscribe(resp => {
      const userProfile: User = resp.data;
      this.username = userProfile.fullname;
      console.log(userProfile);
    }, (err) => {
      console.log('ERR GETPROFILE', err);
    });
  }

}
