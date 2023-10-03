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
  constructor(private http: HttpClient) {}

  selectOrders() {
    return this.http.get(`${Constants.apiEndpoint}/Orders/SelectOrders`);
  }
  createOrder(data: Order): Observable<any> {
    let API_URL = `${Constants.apiEndpoint}/Orders/CreateOrder`;
    console.log(API_URL)
    return this.http.post(API_URL, data);
  }
  updateOrder(data: Order): Observable<any> {
    let API_URL = `${Constants.apiEndpoint}/Orders/UpdateOrder/${data.id}`;
    return this.http.put(API_URL, data, { headers: this.headers });
  }
  deleteOrder(id: number): Observable<any> {
    let API_URL = `${Constants.apiEndpoint}/Orders/DeleteOrder/${id}`;
    return this.http.delete(API_URL, { headers: this.headers });
  }
}
