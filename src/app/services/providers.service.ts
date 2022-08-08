import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  
  private url: string = environment.API_URL + "/providers";
  constructor(private http: HttpClient) {
    
   }

   getAll(){
    return this.http.get<ApiResponse>(this.url);
   }

   getAsCatalogue(){
    return this.http.get<ApiResponse>(this.url+'/catalogue');
   }

   create(provider: Provider){
    return this.http.post<ApiResponse>(this.url, provider);
   }

}
