import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { Constants } from "src/app/constants";
import { Order } from "src/app/models/order";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(`${Constants.apiEndpoint}/Orders`);
  }
  createOrder(data: Order): Observable<any> {
    let API_URL = `${Constants.apiEndpoint}/Orders`;
    return this.http.post(API_URL, data);
  }
}
