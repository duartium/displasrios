import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/ApiResponse';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {
  private apiUrl = `${environment.API_URL}/catalogs`;

  constructor(private http: HttpClient) { }

  getAll(){
      return this.http.get(this.apiUrl);
  }

  getByName(name: string){
    return this.http.get<ApiResponse>(this.apiUrl+'/'+name);
  }
}
