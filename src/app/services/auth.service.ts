import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDto } from '../Dtos/AuthDto.model';
import { AuthRequest } from '../models/AuthRequest.model';
import { TokenService } from './token.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/authentication/login`;

  constructor(private http: HttpClient) { }

  authenticate(authRequest: AuthRequest){
      return this.http.post<AuthDto>(this.apiUrl, authRequest);
  }
}
