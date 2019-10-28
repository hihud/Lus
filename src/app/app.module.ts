import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//Component
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductGetComponent } from './components/product-get/product-get.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
//Service
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HttpConfigInterceptor} from './helper/httpconfig.interceptor';
import { ProductViewComponent } from './components/product-view/product-view.component'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent,
    ProductAddComponent,
    ProductGetComponent,
    ProductEditComponent,
    LoginComponent,
    RegisterComponent,
    ProductViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule,
     CKEditorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
