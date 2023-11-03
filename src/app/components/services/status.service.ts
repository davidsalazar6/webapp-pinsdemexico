import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  getStatus() {
    return this.http.get(`${Constants.apiEndpoint}/Status`);
  }
}
