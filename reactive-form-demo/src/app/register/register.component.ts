import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isClicked:boolean = false;
  registrationForm: FormGroup;
  data: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')])
    }, {validator:MyAwesomeRangeValidator})
  }

  get rf() { return this.registrationForm.controls; }

  register() {
    this.isClicked = true;
    console.log(this.registrationForm.value);
    this.data=this.registrationForm.value;

  }

}
const MyAwesomeRangeValidator: ValidatorFn = (fg: FormGroup) => {
  const password = fg.get('password');
  const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,25}$/;
  
  if (password.value.length < 8) {
    password.setErrors({ notValid: 'Password must be atleast 8 character long.' });
  } else if (!regexp.test(password.value)) {
    password.setErrors({ notValid: 'Password is to weak.' });
  }
  // const confpassword = fg.get('confpassword');
  // if (password.value !== null && confpassword.value !== null && password.value !== confpassword.value) {
  //   confpassword.setErrors({ notEqual: true });
  // }
  return null;
};
