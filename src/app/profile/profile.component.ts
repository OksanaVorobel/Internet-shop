import {Component, OnInit} from '@angular/core';
import {Emitters} from "../services/emitters";
import {CookieService} from "../services/cookie.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthorizationService} from "../services/authorization.service";

export interface Profile {
  user: {
  email: string,
  first_name: string,
  last_name: string
}
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile | undefined = undefined;

  private API: string = 'http://127.0.0.1:5000';
  private authToken: string = '';
  Edit: boolean = false;

  form = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    first_name:new FormControl('',[Validators.required]),
    last_name:new FormControl('',[Validators.required])
  })

  constructor(
    private auth: AuthorizationService,
    private cookie: CookieService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
  }

  changeEdit(): void {
    this.Edit = !this.Edit;
  }

  ngOnInit(): void {
    this.authToken = this.cookie.getAuthToken();
    this.http.get<Profile>(this.API + `/users/profile` , {
      headers: { "Authorization": "Bearer " + this.authToken}
    }).subscribe((data) => {
      this.profile = data;
        console.log(data);
    });
  }

  submit() {
    this.authToken = this.cookie.getAuthToken();
    this.http.put(this.API + '/users/update', this.form.getRawValue(), {
      headers: { "Authorization": "Bearer " + this.authToken}
    }).subscribe({
      next: ()=>{
        this.profile = this.form.getRawValue();
        this.cookie.setCookie('user',JSON.stringify(this.profile), 60);
        this.router.navigate(['/']);
      },
      error: (err => {
        if(err.status === 400){
          alert('Bad request');
        }
        if(err.status === 405){
          alert('User with such email already exists');
        }
        if(err.status === 409){
          alert('Fill in all fields');
        }
      })
    });
  }

  logout(): void {
    this.auth.logout().subscribe({
      next: () => {
        this.cookie.clearCookie('access_token');
        this.cookie.clearCookie('user');
        Emitters.authEmitter.emit(false);
        this.router.navigate(['/']);
      },
      
    })
  }

/*
  delete_user(): void {
    this.authToken = this.cookie.getAuthToken();
    ///
    this.cookie.clearCookie('access_token');
        this.cookie.clearCookie('user');
        Emitters.authEmitter.emit(false);
        this.router.navigate(['/']);
    ///    
    this.http.delete(this.API + '/users/delete', {
      headers: { "Authorization": "Bearer " + this.authToken}
    }).subscribe({
      next: ()=>{
        this.cookie.clearCookie('access_token');
        this.cookie.clearCookie('user');
        Emitters.authEmitter.emit(false);
        this.router.navigate(['/']);
      },
      error: (err => {
        if(err.status === 401){
          alert('Bad request');
        }
      })
    });
  }
*/
}