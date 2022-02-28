import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {
  private apiUrl = 'http://localhost:63674/api/v1/catalogs';

  constructor(private http: HttpClient) { }

  getAll(){
      return this.http.get(this.apiUrl);
  }
}
