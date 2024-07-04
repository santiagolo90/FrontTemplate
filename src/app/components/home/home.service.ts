import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpService: HttpService) { }
  
  public get(endpoint: string){
    return this.httpService.get(endpoint, {responseType: 'text'}).pipe(
      map(response => {
        try {
          return JSON.parse(response);
        } catch {
          return response;
        }
      })
    );
  }
}
