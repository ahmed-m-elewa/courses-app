import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {AuthenticationService} from './auth/services/authentication.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './home/home.component';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AlertComponent } from './common/components/alert/alert.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import {NgbModalModule, NgbPopoverModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthGuard} from './auth/services/guards/auth-guard.service';
import {AuthInterceptor} from './auth/interceptors/auth.interceptor';
import { LoadingComponent } from './common/components/loading/loading.component';
import { DatePipe } from './common/pipes/date.pipe';
import { HeaderComponent } from './common/components/header/header.component';
import { RegistrationComponent } from './auth/components/registration/registration.component';
import { CoursesListComponent } from './courses-list/courses-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent,
    NotFoundComponent,
    LoadingComponent,
    DatePipe,
    HeaderComponent,
    RegistrationComponent,
    CoursesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    NgbTypeaheadModule,
    ModalModule.forRoot(),
    NgbPopoverModule,
    NgbModalModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    }),
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function jwtTokenGetter() {
  return localStorage.getItem('token');
}
