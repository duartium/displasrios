import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthRequest } from 'src/app/models/AuthRequest.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

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
  
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService) { 
    
  }

  ngOnInit(): void {
  }

  public authenticate(){
    console.log(this.frmUser);
    if(!this.frmUser.valid){
      alert('Usuario o contraseña incorrectas');
      return;
    }

    const authRequest: AuthRequest ={
        username: this.frmUser.get('username').value,
        password: this.frmUser.get('password').value
    };

    this.authService.authenticate(authRequest)
      .subscribe(resp => {
        console.log('created', resp);
        this.tokenService.saveToken(resp.data);
      });
    console.log('OPK');
  }

}
