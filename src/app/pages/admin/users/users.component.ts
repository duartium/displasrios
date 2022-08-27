import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  constructor(private userService: UsersService) { 

    this.getUsers();
  }

  ngOnInit(): void {
    
  }

  getUsers(){
    this.userService.getAll().subscribe(resp => {
        if(resp.success){
          this.users = resp.data;
        }else{
          console.log('SUCCESS FALSE', resp);    
        }
    }, (err) => {
      console.log('ITS BAD');
      console.log('ERROR', err);
    });
  }
}
