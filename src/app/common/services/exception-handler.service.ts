import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../auth/services/authentication.service';
import {ExceptionCodes} from '../config-files/exception-codes.config';

@Injectable({providedIn: 'root'})
export class ExceptionHandlerService {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 401 || error.status === 403) {
        this.router.navigate(['/auth/login']);
        error.error.message = 'Unauthorized request';
      } else {
        error.error.message = this.mapError(error);
      }
      console.error(
        `API returned code ${error.status}, ` +
        `body is: ` , error.error);
    }
    return error;
  }


  private  mapError(error: HttpErrorResponse) {
    if (error.error  && error.error.code) {
      return  ExceptionCodes[error.error.code] ? ExceptionCodes[error.error.code] : 'Something went Wrong' ;
    }
    return  'Something went Wrong!';
  }
}
