import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('From') !== 'auth') {
      req = req.clone({
        setHeaders: {
          'Authorization': localStorage.getItem('token'),
        }
      });
    }
    return next.handle(req);
  }
}
