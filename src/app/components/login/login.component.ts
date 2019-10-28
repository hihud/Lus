import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service'
import { map } from 'rxjs/operators';
import User from 'src/app/models/User';
import 'rxjs/add/operator/catch';
import { Observable, pipe, throwError } from 'rxjs';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  unauthorized: boolean;
  angForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private fb: FormBuilder, private us: UsersService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }

  login(Username, Password) {
    this.us.login(Username, Password).
      pipe(map((user: User) => {
            this.unauthorized = false;
            location.replace('/product/view');
        })).catch((err)=>{
          this.unauthorized = true;
          return throwError(err);
        }).subscribe();
  }

  ngOnInit() {
    this.unauthorized;
  }

}
