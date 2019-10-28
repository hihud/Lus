import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './components/product-add/product-add.component'
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductGetComponent } from './components/product-get/product-get.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { from } from 'rxjs';


const routes: Routes = [
  { path: 'product/create', component: ProductAddComponent },
  { path: 'product/create', component: ProductAddComponent },
  { path: 'edit/:id', component: ProductEditComponent },
  { path: 'products', component: ProductGetComponent },
  { path: 'product/view', component: ProductViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
