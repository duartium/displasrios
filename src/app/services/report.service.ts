import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/ApiResponse';
import { IncomeBySellersRequest } from '../models/IncomeBySellers.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url: string = environment.API_URL + '/reports';
  constructor(private http: HttpClient) { }

  IncomePerSellers(request: IncomeBySellersRequest){
    return this.http.get<ApiResponse>(`${this.url}/income-per-sellers?dateFrom=${request.dateFrom}&dateUntil=${request.dateUntil}`);
  }

  GetTotalSalesToday(idUser: number){
    return this.http.get<ApiResponse>(`${this.url}/get-total-sales-today/${idUser}`);
  }

}
