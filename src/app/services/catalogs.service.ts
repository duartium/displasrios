import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}