import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/components/login/login.component';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './common/components/not-found/not-found.component';
import {AuthGuard} from './auth/services/guards/auth-guard.service';
import {RegistrationComponent} from './auth/components/registration/registration.component';
import {CoursesListComponent} from './courses-list/courses-list.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }, {
    path: 'auth/login',
    component: LoginComponent,
    pathMatch: 'full'
  }, {
    path: 'auth/register',
    component: RegistrationComponent,
    pathMatch: 'full'
  }, {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
