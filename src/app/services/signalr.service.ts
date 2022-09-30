import { Injectable, Output } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { EventEmitter } from '@angular/core';
import { SummaryOrdersOfDayResp } from '../Dtos/OrderReceivableDto.model';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  @Output() eventNotifica: EventEmitter<SummaryOrdersOfDayResp> = new EventEmitter<SummaryOrdersOfDayResp>();
  public hubConnection: HubConnection;
  

  constructor() { 
    let builder = new HubConnectionBuilder();
    this.hubConnection = builder.withUrl(environment.HUB_URL).build();

    this.hubConnection.on("orderentry", (data: string) => {
        console.log('respuesta hub', data);
        this.eventNotifica.emit(JSON.parse(data));
    });
    this.hubConnection.start();
  }


}
