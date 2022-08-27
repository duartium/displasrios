import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  @ViewChild('main_loader') mainModal: ElementRef;

  frmUser: FormGroup;
  profiles: ItemCatalogue[];
  firstIdProfile: number;

  constructor(private fb: FormBuilder,
    private userService: UsersService,
    private renderer: Renderer2) {
      
  }

  ngOnInit(): void {
    this.getProfiles();

    this.frmUser = this.defaultForm;
  }

  get defaultForm(){
    return this.fb.group({
      identification: this.fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      names: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      surnames: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.email, Validators.minLength(3)]),
      id_profile: this.fb.control(-1, [Validators.required])
    });
  }

  get identification(){
    return this.frmUser.get('identification');
  }

  get names(){
    return this.frmUser.get('names');
  }

  get email(){
    return this.frmUser.get('email');
  }

  get surnames(){
    return this.frmUser.get('surnames');
  }

  get id_profile(){
    return this.frmUser.get('id_profile');
  }

  getProfiles(){
    this.userService.getProfiles().subscribe(resp => {
      this.profiles = resp.data;
      this.id_profile.setValue(this.profiles[0].id);
    });
  }

  createUser(){
    //this.renderer.setStyle(this.mainModal.nativeElement, 'display', 'normal');
    document.getElementById("loader").style.display = "";

    console.log(this.frmUser);

    if(this.frmUser.invalid){
      this.frmUser.markAllAsTouched();
      document.getElementById("loader").style.display = "none";
      Swal.fire({ icon: 'warning', title: 'Notificación', text: 'Corrija los datos del usuario e intente nuevamente.'});
      return;
    }
      
    this.userService.create(this.frmUser.value).subscribe(resp => {
      console.log(resp);
      if(resp.success){
        Swal.fire({ icon: 'success', title: 'Notificación', text: 'Usuario creado. Se enviaron las credenciales al correo electrónico '+this.email.value});
        this.frmUser.reset();
      }else{
        console.log('SUCCESS FALSE', resp);
        Swal.fire({ icon: 'error', title: 'Notificación', text: resp.message});
      }
      document.getElementById("loader").style.display = "none";
    }, (err) => {
      console.log('ERR', err);
      document.getElementById("loader").style.display = "none";
      Swal.fire({ icon: 'error', title: 'Notificación', text: err.message});
    });

  }

}
