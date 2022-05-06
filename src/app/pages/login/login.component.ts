import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/models/AuthRequest.model';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';

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
  
  private idProfile: string;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private catalogService: CatalogsService,
    private userService: UsersService) { 
    
  }

  ngOnInit(): void {
  }

  authenticate(){
    
    if(!this.frmUser.valid){
      alert('Usuario o contraseña incorrectas');
      return;
    }
    document.getElementById("loader").style.display = "";

    const authRequest: AuthRequest ={
        username: this.frmUser.get('username').value,
        password: this.frmUser.get('password').value
    };

    this.authService.authenticate(authRequest)
      .subscribe(resp => {
        this.tokenService.saveToken(resp.data);
      }, (err) => {
        document.getElementById("loader").style.display = "none";
      });
      
    this.catalogService.getAll().subscribe(resp => {
        localStorage.setItem('catalogs', JSON.stringify(resp));

        this.userService.getProfile().subscribe(resp => {
          const userProfile: User = resp.data;
          
          if(userProfile.role == 1){
            this.router.navigate(['admin/pedidos']);
          }else{
            this.router.navigate(['pedidos-cobrar']);
          }
          document.getElementById("loader").style.display = "none";
        }, (err) => {
          document.getElementById("loader").style.display = "none";
        });
        
    }, (err) => {
      document.getElementById("loader").style.display = "none";
    });
    
  }

}
