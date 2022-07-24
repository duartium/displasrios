import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemCatalogue } from 'src/app/models/ItemCatalogue.model';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  frmUser: FormGroup;
  profiles: ItemCatalogue[];
  firstIdProfile: number;

  constructor(private fb: FormBuilder,
    private userService: UsersService) {
      
  }

  ngOnInit(): void {
    this.getProfiles();

    this.frmUser = this.fb.group({
      identification: this.fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      names: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      surnames: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.email, Validators.minLength(3)]),
      id_profile: this.fb.control(this.firstIdProfile, [Validators.required, Validators.email, Validators.minLength(3)])
    });
  }

  getProfiles(){
    this.userService.getProfiles().subscribe(resp => {
      this.profiles = resp.data;
      this.firstIdProfile = this.profiles[0].id;
    });
  }

  createUser(){
      console.log(this.frmUser.value);
  }

}
