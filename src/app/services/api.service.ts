import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  post(url: string, payload: any) {
    return this.http.post(environment.apiBaseUrl + url, payload);
  }
  patch(url: string, payload: any) {
    return this.http.patch(environment.apiBaseUrl + url, payload);
  }
  delete(url: string, payload?: any) {
    if (!payload) {
      return this.http.delete(environment.apiBaseUrl + url);
    }
    return this.http.delete(environment.apiBaseUrl + url, {
      body: payload
    });
  }

}
