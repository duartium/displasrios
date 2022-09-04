import { Component, OnInit } from '@angular/core';
import { _TableUtils } from 'src/app/common/_TableUtils';
import { Provider } from 'src/app/models/Provider.model';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
    //TABLE
    public dtOptions: any = {};
  
  providers: Provider[];
  constructor(private providerService: ProvidersService) { 
    this.initTableProviders();
    this.getProviders();
  }
  
  ngOnInit(): void {
	 
  }

 
  getProviders(parameter?){
    this.providerService.getAll().subscribe(resp => {
      this.providers = resp.data;
    });
  }

	initTableProviders() {
		this.dtOptions = _TableUtils.getDefaultConfiguration();
    this.dtOptions.columns  = this.getColumnsProvidersDT();
	}

  getColumnsProvidersDT() {
		return [
		/*01 */	{ title: 'RUC', data: 'ruc', className: 'text-center' },
		/*02 */	{ title: 'NOMBRE', data: 'name', className: 'text-center' },
		/*03 */	{ title: 'DIRECCIÓN', data: 'address', className: 'text-center' },
		/*04 */	{ title: 'EMAIL', data: 'email', className: 'text-center' },
		/*05 */	{ title: 'TELÉFONO', data: 'phone', className: 'text-center' }
		]
  }

}
