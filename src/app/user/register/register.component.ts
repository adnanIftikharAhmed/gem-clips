import { Component } from '@angular/core';''
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = new FormControl('',[
    Validators.required,
    Validators.maxLength(5),
    Validators.minLength(3)

  ])
  email = new FormControl('',[
    Validators.required,
    Validators.email
  ])
  age = new FormControl('',[
    Validators.required,
    Validators.min(18),
    Validators.max(120),
    Validators.minLength(1),
    Validators.maxLength(3)
  ])
  password= new FormControl('',[
    Validators.required,
    Validators.pattern("[A-Za-z]")
  ])
  confirm_password = new FormControl('',[
    Validators.required
  ])
  phoneNumber= new FormControl('',[
    Validators.required,
    Validators.minLength(15),
    Validators.maxLength(15)
  ])

  registerForm = new FormGroup({
   name : this.name,
   email: this.email,
   age: this.age,
   password: this.password,
   confirm_password: this.confirm_password,
   phoneNumber: this.phoneNumber  
  })
}
