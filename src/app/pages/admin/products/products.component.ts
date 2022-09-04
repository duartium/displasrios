import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Product } from './../../../models/Products.model';
import { ProductsService } from 'src/app/services/products.service';
import { _TableUtils } from 'src/app/common/_TableUtils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public dtOptions: any = {};
  products: Product[];

  constructor(private productService: ProductsService) { 
    this.initTableProducts();
    this.getProducts();
  }

  ngOnInit(): void {
	 
  }



  getProducts(parameter?){
      this.productService.getAll().subscribe(resp => {
        this.products = resp.data;
        console.log('products', this.products);
      });
  }
	initTableProducts() {
		this.dtOptions = _TableUtils.getDefaultConfiguration();
    this.dtOptions.columns  = this.getColumnsProductsDT();
	}

  getColumnsProductsDT() {
		return [
		/*01 */	{ title: 'CODIGO', data: 'code', className: 'text-center' },
		/*02 */	{ title: 'NOMBRE', data: 'name', className: 'text-center' },
		/*03 */	{ title: 'COSTO', data: 'cost', className: 'text-center' },
		/*04 */	{ title: 'P. VENTA', data: 'sale_price', className: 'text-center' },
		/*05 */	{ title: 'STOCK', data: 'stock', className: 'text-center' },
		/*05 */	{ title: 'CANT X PAQ.', data: 'quantity_package', className: 'text-center' },
		/*05 */	{ title: 'CANT X BULTO.', data: 'quantity_lump', className: 'text-center' },
		/*05 */	{ title: 'CATEGORÍA', data: 'category_name', className: 'text-center' },
		/*05 */	{ title: 'PROVEEDOR', data: 'provider_name', className: 'text-center' },
		]
  }
}
