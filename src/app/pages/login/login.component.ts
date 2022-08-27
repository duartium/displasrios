import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/models/AuthRequest.model';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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
          console.log('token', resp.data);
          this.catalogService.getAll().subscribe(resp => {
            localStorage.setItem('catalogs', JSON.stringify(resp));
    
            this.userService.getProfile().subscribe(resp => {
              const userProfile: User = resp.data;
              console.log(userProfile);
              if(userProfile.role === 1){//recaudador
                this.router.navigate(['pedidos-cobrar']);
                document.getElementById("loader").style.display = "none";
              }else{
                this.router.navigate(['admin/pedidos']);
                document.getElementById("loader").style.display = "none";
              }
              
            }, (err) => {
              document.getElementById("loader").style.display = "none";
            });
            
        }, (err) => {
          document.getElementById("loader").style.display = "none";
        });

      }, (err: HttpErrorResponse) => {
        console.log('err', err);
        if(err.status == 400){
          Swal.fire({ icon: 'warning', title: 'Al parecer has olvidado tus credenciales', text: "Usuario o contraseña incorrectas. Revisa tus credenciales y vuelve a intentar."});
        }else{
            Swal.fire({ icon: 'error', title: 'Lo sentimos, se ha generado un conflicto', text: 'No se pudo autenticar.'});
        }
        document.getElementById("loader").style.display = "none";
      });
      
   
    
  }

}
