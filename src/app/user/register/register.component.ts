import { Component } from '@angular/core';''
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
constructor(private auth: AngularFireAuth,
  private db: AngularFirestore){}

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
    // Validators.pattern("[A-Za-z]")
  ])
  confirm_password = new FormControl('',[
    Validators.required
  ])
  phoneNumber= new FormControl('',[
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])
  showAlert =false
  alertMsg = 'Please wait! Your account is being created.'
  alertColor = 'blue'

  registerForm = new FormGroup({
   name : this.name,
   email: this.email,
   age: this.age,
   password: this.password,
   confirm_password: this.confirm_password,
   phoneNumber: this.phoneNumber  
  })

  async register(){
    this.showAlert = true
    this.alertMsg = 'Please wait! Your account is being created.'
    this.alertColor = 'blue'
    const {email, password} = this.registerForm.value
    try{
    const userCred = await this.auth.createUserWithEmailAndPassword(
      email as string, password as string
    )
   this.db.collection('users').add({
    name: this.name.value,
    email:this.email.value,
    age: this.age.value,
    phoneNumber: this.phoneNumber.value
   })
    
  } catch(e){
    console.error(e);

    this.alertMsg = 'An unexpected error occured. Please try again later'
    this.alertColor = 'red'
    return 
    
   }
   this.alertMsg = 'Success! Your account has been created'
   this.alertColor = 'green'
   }
}