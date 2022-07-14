import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/models/Provider.model';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  
  providers: Provider[];
  constructor(private providerService: ProvidersService) { 
    this.getProviders();
  }
  
  ngOnInit(): void {
  }

  getProviders(){
    this.providerService.getAll().subscribe(resp => {
      this.providers = resp.data;
    });
  }

}
