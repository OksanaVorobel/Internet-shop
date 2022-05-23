import {Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "../services/cookie.service";
import {Router} from "@angular/router";
import {AuthorizationService} from "../services/authorization.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  errorMessage: string = '';

    form = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    first_name:new FormControl('',[Validators.required]),
    last_name:new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(5)]),
    confirm_password:new FormControl('',[Validators.required])
  })
  passwords_not_match= false

  constructor(
    private router: Router,
    private cookie: CookieService,
    private auth: AuthorizationService
  ) { }
  

  ngOnInit(): void {
  }

  submit() {
    let data = this.form.value;
    if(data['password']!==data['confirm_password']){
        this.passwords_not_match = true;
        setTimeout(()=>{this.passwords_not_match = false;},5000);
        alert('Passwords do not match');
        return
    }
    delete data['confirm_password'];
    
    this.auth.registration(data).subscribe((data) => {
    this.cookie.setCookie('access_token', data['access_token'], 60);
    this.cookie.setCookie('self', JSON.stringify(data['user']), 60);
    this.router.navigate(['/']);
      }, 
      (error) => {
          if (error.status === 403) {
            alert('User with this email already registered');
          }
          if (error.status === 400) {
            alert('Wrong data');
          }
      }
    )
  }
}
