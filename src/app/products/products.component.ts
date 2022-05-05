import { Component, OnInit, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "../services/cookie.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  API: string = 'http://127.0.0.1:5000';

  productForDisplay:{
    id: number,
    name: string,
    category: string,
    quantity: string,
    price: string,
    description:string, 
    image: string}={} as any;

  products:[{
    id: number,
    name: string,
    category: string,
    quantity: string,
    price: string,
    description:string, 
    img: string
  }] = [] as any;

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.http.get<[{
      id: number,
      name: string,
      category: string,
      quantity: string,
      price: string,
      description:string, 
      img: string
    }]>
    (this.API + "/products").subscribe({
      next: (data) => {
        data.forEach((product)=>{
          this.products.push(product);

        })
      }
    })
  }
}