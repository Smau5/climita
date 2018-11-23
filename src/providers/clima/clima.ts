import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class ClimaProvider {
  apiKey = '0aa6e9d83d04438188121926182311';
  url;
  
  constructor(public http: HttpClient) {
    console.log('Hello ClimaProvider Provider');
    //https://www.apixu.com/
    this.url = "http://api.apixu.com/v1/current.json?key=" + this.apiKey + "&q=santa cruz";

  }

  getClima():any{
    return this.http.get(this.url + '.json.')
      .map(res=> res);
  }



}
