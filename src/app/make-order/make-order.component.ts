import {Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "../services/cookie.service";
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss']
})
export class MakeOrderComponent implements OnInit {
  private API: string = 'http://127.0.0.1:5000';
  private authToken: string = '';
  errorMessage: string = '';

  form: FormGroup = {} as FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cookie: CookieService
  ) { }
  

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      quantity: '',
      city: '',
      address: ''
    })
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
      error: (errorResponse) => {
        this.errorMessage = errorResponse.error.message
        alert(this.errorMessage)
      }
    });
  })
}
}