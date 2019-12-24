import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserCreds} from '../../common/models/user-creds';
import {LoginResponse} from '../../common/models/login-response';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ApiService} from '../../common/services/api-services/api.service';
import {User} from '../../common/models/user.model';

@Injectable({providedIn: 'root'})
export class AuthenticationService extends ApiService {
  loading;
  loginError;
  loggedInUser: User;

  constructor(
    public http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    super(http);
  }

  login(creds: UserCreds) {
    this.loading = true;
    let headers = new HttpHeaders();
    headers = headers.append('From', 'auth');
    this.post<LoginResponse>('/auth/login',
      creds, headers).subscribe(
      res => {
        this.loading = false;
        this.loggedInUser = res.user;
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['']);
      }, err => {
        this.loading = false;
        console.error(err);
        this.loginError = err.error.message;
      }
    );
  }

  createNewUser(user: User) {
    this.loading = true;
    let headers = new HttpHeaders();
    headers = headers.append('From', 'auth');
    this.post<LoginResponse>('/auth/register',
      user, headers).subscribe(
      res => {
        this.loading = false;
        this.loggedInUser = res.user;
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['']);
      }, err => {
        this.loading = false;
        console.error(err);
        this.loginError = err.error.message;
      }
    );
  }


  get isLoggedIn() {
    const token = this.jwtHelper.tokenGetter();
    if (!token) {
      return false;
    }
    const isExpired = this.jwtHelper.isTokenExpired(token);
    return !isExpired;
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }


  getLoggedInUser() {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')) as User;
  }
}
