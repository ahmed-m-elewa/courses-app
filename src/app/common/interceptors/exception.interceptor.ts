import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {ExceptionHandlerService} from '../services/exception-handler.service';

@Injectable()
export class ExceptionInterceptor implements HttpInterceptor {
  constructor(private exceptionHandler: ExceptionHandlerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(err => {

      return throwError(this.exceptionHandler.handleError(err));
    }));
  }
}
