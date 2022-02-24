import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frmUser = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(3)])
  });
  
  constructor(private fb: FormBuilder) { 
    
  }

  ngOnInit(): void {
  }

  public authenticate(){
    console.log(this.frmUser);
    if(!this.frmUser.valid){
      alert('Usuario o contraseña incorrectas');
      return;
    }

    console.log('OPK');
  }

}
