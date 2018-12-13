import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FindServiceComponent } from './find-service/find-service.component';
import { SingleServiceComponent } from './single-service/single-service.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ServiceBookingsComponent } from './service-bookings/service-bookings.component';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'home/landing-page', pathMatch: 'full'},
  {path: 'home', redirectTo: 'home/landing-page', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children:[
    {path: 'landing-page', component: LandingPageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
  ] },
  {path: 'portal', redirectTo: 'portal/find-service', pathMatch: 'full'},
  {path: 'portal', component: PortalComponent, canActivate: [AuthGuard], children:[
    {path: 'find-service', component: FindServiceComponent},
    {path: 'service/:id', component: SingleServiceComponent},
    {path: 'profile', component: UserProfileComponent},
    {path: 'my-bookings', component: ServiceBookingsComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


//TODO: create child routes!!