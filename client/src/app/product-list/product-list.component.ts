import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ProductApiService } from './../services/product-api.service';

import { Product } from './../models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  p = 1;

  constructor(
    private titleService: Title,
    private productApi: ProductApiService
  ) {

  }

  ngOnInit(): void {
    this.titleService.setTitle('Agri Permata | Dashboard - Products');
    this.productApi.getProducts()
      .subscribe((res: any) => {
        this.products = res.data;
        console.log(this.products);
      }, err => {
        console.log(err);
      });

  }

  // tslint:disable-next-line: typedef
  deleteRow(id: any, index: number): void {
    if (confirm('Are you sure?')) {
      this.productApi.deleteProduct(id)
        .subscribe((res: any) => {
          this.products.splice(index, 1);
        }, err => {
          console.log(err);
        });
    }
  }



}
