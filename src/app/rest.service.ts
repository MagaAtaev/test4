import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditModel } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getRoute() {
    return this.http.get("https://navig.kandidatrp.ru/ors/v2/directions/driving-car?start=45.69231,%2043.316699&end=45.687429,%2043.328728")
  }

  putData(data: EditModel) {
    console.log(data)
    //return this.http.put(url, data)
  }
}
