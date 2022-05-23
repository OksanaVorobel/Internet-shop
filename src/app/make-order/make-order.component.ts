import {Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "../services/cookie.service";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {
  private API: string = 'http://127.0.0.1:5000';
  private authToken: string = '';

  form = new FormGroup({
    quantity:new FormControl('',[Validators.required, Validators.minLength(1)]),
    city:new FormControl('',[Validators.required, Validators.minLength(1)]),
    address: new FormControl('',[Validators.required, Validators.minLength(1)])
  })

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cookie: CookieService
  ) { }
  

  ngOnInit(): void {
  }

  submit() {
    this.authToken = this.cookie.getAuthToken();
    this.route.params.subscribe((params) => {
    this.http.post(this.API + `/products/${params["product_id"]}/order`, this.form.getRawValue(), {
      headers: { "Authorization": "Bearer " + this.authToken}
    }).subscribe({
      next: ()=>{
        this.router.navigate(['/']); 
      },
      error: (err => {
        if(err.status === 400){
          alert('Bad request');
        }
        if(err.status === 405){
          alert('The product is not available in such quantities');
        }
      })
    });
  })
}
}