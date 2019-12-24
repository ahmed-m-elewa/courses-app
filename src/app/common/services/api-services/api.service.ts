import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) {
  }

  get<T>(apiUrl: string, headers?): Observable<T> {
    return this.http.get<T>(environment.baseUrl + apiUrl, {headers: headers});
  }

  post<T>(apiUrl: string, body, headers?): Observable<T> {
    return this.http.post<T>(environment.baseUrl + apiUrl, body, {headers: headers});
  }

  put<T>(apiUrl: string, body?, headers?): Observable<T> {
    return this.http.put<T>(environment.baseUrl + apiUrl, body, {headers: headers});
  }

  delete<T>(apiUrl: string, headers?): Observable<T> {
    return this.http.delete<T>(environment.baseUrl + apiUrl, {headers: headers});
  }
}
