import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "../services/cookie.service";
import {Product} from "../services/product"

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  API: string = 'http://127.0.0.1:5000';
  private authToken: string = '';

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
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.authToken = this.cookie.getAuthToken();
    this.http.get<[{
      id: number,
      name: string,
      category: string,
      quantity: string,
      price: string,
      img: string
    }]>
    (this.API + "/shopping/cart/products", {
      headers: { "Authorization": "Bearer " + this.authToken}
    }).subscribe({
      next: (data) => {
        data.forEach((product_for_display)=>{
          this.products.push(product_for_display);
        })
      }
    })
  }

  delete_product(product_id: number): void{ 
    this.authToken = this.cookie.getAuthToken();
    this.http.delete(this.API + `/shopping/cart/products/${product_id}`, {
      headers: { "Authorization": "Bearer " + this.authToken}
    }).subscribe((data) => {
      location.reload();
        }, 
        (error) => {
            if (error.status === 400) {
              alert('Something wrong');
            }
            if (error.status === 200) {  
            location.reload();
            }
        }
        
      );
  }
}
