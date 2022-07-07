import { Component, OnInit } from '@angular/core';
import { Product } from './../../../models/Products.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductsService) { 
      this.getProducts();
  }

  ngOnInit(): void {
  }

  getProducts(){
      this.productService.getAll().subscribe(resp => {
        this.products = resp.data;
        console.log('products', this.products);
      });
  }
}
