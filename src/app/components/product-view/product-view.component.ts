import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import Product from '../../models/Product';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  products: Product[];
  constructor(private ps: ProductsService) { }

  ngOnInit() {
    this.ps.getProducts().subscribe((data:Product[]) => {
      this.products = data;
  });
  }
}
