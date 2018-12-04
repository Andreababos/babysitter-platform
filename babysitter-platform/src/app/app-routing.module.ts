import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FindServiceComponent } from './find-service/find-service.component';
import { SingleServiceComponent } from './single-service/single-service.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ServiceBookingsComponent } from './service-bookings/service-bookings.component';

const routes: Routes = [
  {path: '', redirectTo: 'find-service', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'find-service', component: FindServiceComponent},
  {path: 'service/:id', component: SingleServiceComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'my-bookings', component: ServiceBookingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
