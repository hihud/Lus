import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Product from '../models/Product';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  uri = 'https://lusprojectapi.azurewebsites.net/api/product';
  constructor(private http: HttpClient) { }

  addProduct(Name, Collection, Provider,Description, Image) {
    const obj = {
      Name,
      Collection,
      Provider,
      Description,
      Image
    };
    this.http.post(`${this.uri}/addProduct`, obj)
        .subscribe(res => console.log('Done'));
  }
  updateProduct(Name, Collection, Provider, LusId) {
    const obj = {
      LusId,
      Name,
      Collection,
      Provider
    };
    return this.http.put(`${this.uri}/updateProduct`, obj).pipe(map((response:Product)=>{
      return response;
    }));
  }

  getProducts() {
    return this.http.get(`${this.uri}/GetAll`);
  }

  getProductInfor(lusid:string){
    
    return this.http.get(`${this.uri}/GetProductInfor?lusid=`+lusid);
  }

  uploadImage(formData){
   return  this.http.post('url/to/your/api', formData)
    .pipe(map((res:Object) => {
      console.log(res);
      return  res;
    }));
  }

}
