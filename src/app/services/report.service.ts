import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/ApiResponse';
import { BestCustomer } from '../models/Customer.model';
import { IncomeBySellersRequest } from '../models/IncomeBySellers.model';
import { SellerPersonalReport } from '../models/reports/sellerPersonalReport.model';
import { Response } from '../models/Response.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url: string = environment.API_URL + '/reports';
  constructor(private http: HttpClient) { }

  IncomePerSellers(request: IncomeBySellersRequest){
    return this.http.get<ApiResponse>(`${this.url}/income-per-sellers?dateFrom=${request.dateFrom}&dateUntil=${request.dateUntil}`);
  }

  GetTotalSalesToday(){
    return this.http.get<ApiResponse>(`${this.url}/get-total-sales-today`);
  }

  GetSellerPersonalReport(){
    return this.http.get<Response<SellerPersonalReport>>(`${this.url}/get-seller-personal-report`);
  }

  GetBestCustomers(){
    return this.http.get<Response<BestCustomer[]>>(`${this.url}/best-customers`);
  }

}
