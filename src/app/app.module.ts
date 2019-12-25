import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule, MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {AuthenticationService} from './auth/services/authentication.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './auth/components/login/login.component';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotFoundComponent} from './common/components/not-found/not-found.component';
import {NgbModalModule, NgbPopoverModule, NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthGuard} from './auth/services/guards/auth-guard.service';
import {AuthInterceptor} from './auth/interceptors/auth.interceptor';
import {LoadingComponent} from './common/components/loading/loading.component';
import {DatePipe} from './common/pipes/date.pipe';
import {HeaderComponent} from './common/components/header/header.component';
import {RegistrationComponent} from './auth/components/registration/registration.component';
import {CoursesListComponent} from './courses-list/courses-list.component';
import {SecuredDirective} from './auth/directives/secured.directive';
import { UserCoursesComponent } from './user-courses/user-courses.component';
import {ExceptionInterceptor} from './common/interceptors/exception.interceptor';
import {ExceptionHandlerService} from './common/services/exception-handler.service';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NotFoundComponent,
        LoadingComponent,
        DatePipe,
        HeaderComponent,
        RegistrationComponent,
        CoursesListComponent,
        SecuredDirective,
        UserCoursesComponent
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
        MatMenuModule,
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
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ExceptionInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function jwtTokenGetter() {
    return localStorage.getItem('token');
}
