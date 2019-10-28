import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { UsersService} from '../../services/users.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private us: UsersService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      Username: ['', Validators.required ],
      Password: ['', Validators.required ],
      FullName:['',Validators.required],
      Email: ['',Validators.required],
      Phone: ['',Validators.required],
      Adress: ['',Validators.required]
    });
  }
  register(Username, Password,Email){
    this.us.register(Username, Password,Email);
  }
  ngOnInit() {
  }

}
