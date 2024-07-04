import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HttpService {

  constructor(
    protected http: HttpClient,
    protected router: Router,
  ) {}

  request(req: Observable<any>, showLoading: boolean): Observable<any> {
    return req.pipe(
      map((res: Response) => {
        let result = null;
        if (res !== null) {
          result = res;
        }
        return result;
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  errorHandler(error: HttpErrorResponse, showLoading: boolean |undefined) {
    switch (true) {
      case error.status === 503:
        this.router.navigate(['error', '503']);
        break;
    }
  }

  get(
    url: string,
    requestOptions?: {},
    showLoading = false
  ): Observable<any> {
      const observableRequest = this.request(
        this.http.get<any>(url, requestOptions),
        showLoading
      );
      return observableRequest;
  }

  post(
    url: string,
    payload?: any,
    requestOptions?: {},
    showLoading = false
  ) {
      const observableRequest = this.request(
        this.http.post<any>(url, payload ? payload : null, requestOptions),
        showLoading
      );
      return observableRequest;
  }

  put(
    url: string,
    payload?: any,
    requestOptions?: {},
    showLoading = false
  ) {
      const observableRequest = this.request(
        this.http.put<any>(url, payload ? payload : null, requestOptions),
        showLoading
      );
      return observableRequest;
  }

  patch(
    url: string,
    payload?: any,
    requestOptions?: {},
    showLoading = false
  ) {
      const observableRequest = this.request(
        this.http.patch<any>(url, payload ? payload : null, requestOptions),
        showLoading
      );
      return observableRequest;
  }

  delete(
    url: string,
    payload?: any,
    requestOptions?: {},
    showLoading = false
  ) {
      const observableRequest = this.request(
        this.http.request<any>('delete', url, {
          ...requestOptions,
          body: payload
        }),
        showLoading
      );
      return observableRequest;
  }
}
