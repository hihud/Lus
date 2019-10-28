import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Product from '../../models/Product';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  angForm: FormGroup;
  product: Product;
  constructor(private fb: FormBuilder, private ps: ProductsService,private route: ActivatedRoute,private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      Name: ['', Validators.required],
      Collection: ['', Validators.required],
      Provider: ['', Validators.required]
    });
  }
  updateProduct(Name, Collection, Provider) {
     this.route.params.subscribe(params => {
       this.ps.updateProduct(Name, Collection, Provider, params.id).subscribe((data)=>{
        this.product = data;
       });
     });
    console.log('update');
  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.ps.getProductInfor(params.id).subscribe((data: Product) => {
        this.product = data;
      });
    });
  }

}
