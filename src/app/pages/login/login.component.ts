import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest, ChangePassword, VerificationCodeRequest } from 'src/app/models/AuthRequest.model';
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

  currentScreen: number= 1;
  frmUser = this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(3)])
  });
  
  frmResetPassword= this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.minLength(3)]),
  });

  frmVerifyCode = this.fb.group({
    codeChar1: this.fb.control('', [Validators.required, Validators.maxLength(1)]),
    codeChar2: this.fb.control('', [Validators.required, Validators.maxLength(1)]),
    codeChar3: this.fb.control('', [Validators.required, Validators.maxLength(1)]),
    codeChar4: this.fb.control('', [Validators.required, Validators.maxLength(1)]),
    codeChar5: this.fb.control('', [Validators.required, Validators.maxLength(1)]),
  });

  frmChangePassword =  this.fb.group({
    password1: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    password2: this.fb.control('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private catalogService: CatalogsService,
    private userService: UsersService) { 
    
  }

  ngOnInit(): void {
  }

  get codeChar1(){
    return this.frmVerifyCode.get('codeChar1');
  }

  get codeChar2(){
    return this.frmVerifyCode.get('codeChar2');
  }

  get codeChar3(){
    return this.frmVerifyCode.get('codeChar3');
  }

  get codeChar4(){
    return this.frmVerifyCode.get('codeChar4');
  }

  get codeChar5(){
    return this.frmVerifyCode.get('codeChar5');
  }

  authenticate(){
    
    if(!this.frmUser.valid){
      alert('Usuario o contraseña incorrectas');
      return;
    }
    document.getElementById("loader").style.display = "";

    const authRequest: AuthRequest ={
        username: String(this.frmUser.get('username').value),
        password: String(this.frmUser.get('password').value)
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
              console.log(err);
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

  get password1(){
    return this.frmChangePassword.get('password1');
  }

  get password2(){
    return this.frmChangePassword.get('password2');
  }

  get email(){
    return this.frmResetPassword.get('email');
  }
  

  resetPassword(){
    document.getElementById("loader").style.display = "";

    localStorage.setItem('email_to_reset', this.email.value);

    this.userService.registerVerificationCode(this.email.value).subscribe(resp => {
      document.getElementById("loader").style.display = "none";
      if(!resp.success){
        Swal.fire("Correo inválido", resp.message, 'warning');
        return;
      }

      this.codeChar1.setValue('');
      this.codeChar2.setValue('');
      this.codeChar3.setValue('');
      this.codeChar4.setValue('');
      this.codeChar5.setValue('');
      this.currentScreen = 3;

    }, (err) => {
      document.getElementById("loader").style.display = "none";
      const icon = err.status == 400 ? 'warning' : 'error';
      
      Swal.fire("No se pudo enviar el código de verificación", err.error.message, icon);
    });
  }

  getVerificationCodeString(): string{
    return `${this.codeChar1.value}${this.codeChar2.value}${this.codeChar3.value}${this.codeChar4.value}${this.codeChar5.value}`; 
  }


  verifyCode(){
    if(!this.frmVerifyCode.valid){
      Swal.fire('Ingrese el código recibido completo', '', 'warning');
      return;
    }
    document.getElementById("loader").style.display = "";

    const verificationRequest: VerificationCodeRequest ={
      email: localStorage.getItem('email_to_reset'),
      code: this.getVerificationCodeString().toUpperCase()
    };
  
    this.authService.verifyCode(verificationRequest)
    .subscribe(resp => {
      console.log('resp', resp.data);

      if(resp.success){
        this.currentScreen = 4;
        Swal.fire("Verificación exitosa", "Establece tu nueva contraseña", "success");
      }else{
        Swal.fire("Notificación", resp.message, "warning");
      }



  }, (err: HttpErrorResponse) => {
    console.log('err', err);
    if(err.status == 400){
      Swal.fire({ icon: 'warning', title: 'Al parecer has olvidado tus credenciales', text: "Usuario o contraseña incorrectas. Revisa tus credenciales y vuelve a intentar."});
    }else{
        Swal.fire({ icon: 'error', title: 'Lo sentimos, se ha generado un conflicto', text: 'No se pudo autenticar.'});
    }
  });
  document.getElementById("loader").style.display = "none";
  }

  changePassword(){
    if(!this.frmChangePassword.valid){
      Swal.fire('Ingrese las contraseñas', '', 'warning');
      return;
    }

    const changePassRequest: ChangePassword ={
      email: localStorage.getItem('email_to_reset'),
      newPassword: this.password1.value,
    };

    console.log('changePassRequest', changePassRequest);
    if(this.password1.value != this.password2.value){
      Swal.fire('Datos inválidos', 'Contraseñas no coinciden, corrija e intente de nuevo', 'warning');
      return;
    }

    document.getElementById("loader").style.display = "";

    this.authService.changePassword(changePassRequest)
    .subscribe(resp => {
      console.log('resp', resp.data);

      if(resp.success){
        Swal.fire("Notificación", "¡Se ha cambiado tu contraseña!", "success");
        this.currentScreen = 1;
        this.password1.setValue('');
        this.password2.setValue('');
        localStorage.removeItem('email_to_reset');
      }else{
        Swal.fire("Notificación", resp.message, "warning");
      }

    }, (err: HttpErrorResponse) => {
      console.log('err', err);
      Swal.fire("Notificación", err.error.message, "warning");
    });
    document.getElementById("loader").style.display = "none";

  }
}
