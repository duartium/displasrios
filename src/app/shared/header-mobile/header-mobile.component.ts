import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {

  username: string;

  constructor(private userService: UsersService) { }
  
  ngOnInit(): void {
    this.setCurrentUsername();
  }

  setCurrentUsername(){
    this.userService.getProfile().subscribe(resp => {
      const userProfile: User = resp.data;
      this.username = userProfile.username;
      console.log('userProfile',userProfile);
    }, (err) => {
      console.log('ERR GETPROFILE', err);
    });
  }
  
  closeSession(){
    Swal.fire({
      title: '¿Estás seguro que desea salir?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.closeSession();
      }
    })
  }

}
