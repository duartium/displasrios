import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDto } from '../Dtos/AuthDto.model';
import { AuthRequest, VerificationCodeRequest } from '../models/AuthRequest.model';
import { TokenService } from './token.service';
import { environment } from './../../environments/environment';
import { Response } from '../models/Response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/authentication/login`;

  constructor(private http: HttpClient,
    private tokenService: TokenService) { }

  authenticate(authRequest: AuthRequest){
      return this.http.post<AuthDto>(this.apiUrl, authRequest);
  }

  verifyCode(authRequest: VerificationCodeRequest){
    return this.http.post<Response<boolean>>(this.apiUrl, authRequest);
  }

  logout(){
    this.tokenService.removeToken();
  }
}
