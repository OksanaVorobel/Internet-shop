import {Component, OnInit, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "../services/cookie.service";


class Order {
  id!: number;
    status!: string;
    quantity!: string;
    product_name!: string;
    price!: string;
    img!: string;
  }


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private API: string = 'http://127.0.0.1:5000';
  private authToken: string = '';

  order_for_display!: Order;

  orders:[{
    id: number,
    status: string,
    quantity: string,
    product_name: string,
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
      status: string,
      quantity: string,
      product_name: string,
      price: string,
      img: string
    }]>
    (this.API + "/users/orders" , {
      headers: { "Authorization": "Bearer " + this.authToken}
    }).subscribe({
      next: (data) => {
        data.forEach((order_for_display)=>{
          this.orders.push(order_for_display);
        })
      }
    })
  }
}