import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CookieService} from "../services/cookie.service";
import {Product} from "../services/product"


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  API: string = 'http://127.0.0.1:5000';
  authenticated: boolean = false;
  private authToken: string = '';
  errorMessage: string = '';

  product_for_display!: Product;

  products:[{
    id: number,
    name: string,
    category: string,
    quantity: string,
    price: string,
    img: string
  }] = [] as any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookie: CookieService
  ) { }

  isLoggedIn() {
    return !(this.cookie.getAuthToken() === "");
  }

  ngOnInit(): void {
    this.http.get<[{
      id: number,
      name: string,
      category: string,
      quantity: string,
      price: string,
      img: string
    }]>
    (this.API + "/products").subscribe({
      next: (data) => {
        data.forEach((product_for_display)=>{
          this.products.push(product_for_display);
        })
      }
    })
  }

  add_product(product_id: number): void{ 
    this.authToken = this.cookie.getAuthToken();
    this.http.post(this.API + `/products/${product_id}/shopping/cart`, {}, {
      headers: { "Authorization": "Bearer " + this.authToken}
    }).subscribe(() => {
    },
    (error) => {
      if (error.status === 403) {
        alert('Product already in your shopping cart');
      }
  })
  }
}