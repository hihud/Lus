import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {ProductsService} from '../../services/products.service'
 import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
   public Editor = ClassicEditor;
   public description ={
     editorData: '<p>Discription</p>'
   }
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private ps:ProductsService) {
    this.createForm();
  }

  addProduct(Name, Collection, Provider,Description) {
    this.ps.addProduct(Name, Collection, Provider,Description);
  }
  createForm() {
    this.angForm = this.fb.group({
      Name: ['', Validators.required ],
      Collection: ['', Validators.required ],
      Provider: ['', Validators.required ],
      Description: ['', Validators.required ],
      ProductPrice: ['', Validators.required ]
    });
  }

  ngOnInit() {
  }

}
