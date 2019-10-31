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
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  uploadImage:boolean;

  constructor(private fb: FormBuilder, private ps:ProductsService) {
    this.createForm();
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
}
preview() {
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }
}
uploadProductImage() {
  const formData = new FormData();
    formData.append('file', this.fileData);
    this.ps.uploadImage(formData).subscribe(res=>{
      if(res!=null) {
        this.uploadImage =true;
        this.uploadedFilePath = res.toString();
      } else {
        this.uploadImage = false;
      }
    });
}
  addProduct(Name, Collection, Provider,Description) {
    if(this.fileData==null){
      return this.uploadImage=false;
    }
    let formData = new FormData();
    formData.append('file', this.fileData);
    this.ps.addProduct(Name, Collection, Provider,Description,formData);
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
    this.uploadImage;
  }

}
