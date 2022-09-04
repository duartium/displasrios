import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { _TableUtils } from 'src/app/common/_TableUtils';
import { User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  //TABLE
  public dtOptions: any = {};


  users: User[];
  constructor(private userService: UsersService) { 
    this.initTableUsers();
    this.getUsers();
  }

  getUsers(parameter?){
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


  ngOnInit(): void {
	
  }


	initTableUsers() {
		this.dtOptions = _TableUtils.getDefaultConfiguration();
    this.dtOptions.columns  = this.getColumnsUsersDT();
	}

  getColumnsUsersDT() {
		return [
		/*01 */	{ title: 'Nombres', data: 'fullname', className: 'text-center' },
		/*02 */	{ title: 'Usuario', data: 'username', className: 'text-center' },
		/*03 */	{ title: 'Perfil', data: 'role_name', className: 'text-center' },
		/*04 */	{ title: 'Identificación', data: 'identification', className: 'text-center' },
		/*05 */	{ title: 'Email', data: 'email', className: 'text-center' }
		]
  }

}
