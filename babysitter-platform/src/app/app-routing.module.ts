import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FindServiceComponent } from './find-service/find-service.component';
import { SingleServiceComponent } from './single-service/single-service.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ServiceBookingsComponent } from './service-bookings/service-bookings.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'find-service', pathMatch: 'full', canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'find-service', component: FindServiceComponent, canActivate: [AuthGuard]},
  {path: 'service/:id', component: SingleServiceComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'my-bookings', component: ServiceBookingsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
