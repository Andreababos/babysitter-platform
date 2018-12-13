import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FindServiceComponent } from './find-service/find-service.component';
import { SingleServiceComponent } from './single-service/single-service.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgRedux, DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer } from './redux/store';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BookingComponent } from './booking/booking.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ServiceBookingsComponent } from './service-bookings/service-bookings.component';
import { NavigationComponent } from './navigation/navigation.component';
import { UsersService } from './services/users.service';
import { LoadingComponent } from './loading/loading.component';
import { AuthGuard } from './services/auth-guard.service';
import { FilterUsers } from './filters/user.filter';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const matModules = [ MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    FindServiceComponent,
    SingleServiceComponent,
    UserProfileComponent,
    BookingComponent,
    ErrorMessageComponent,
    ServiceBookingsComponent,
    NavigationComponent,
    LoadingComponent,
    FilterUsers,
    HomeComponent,
    PortalComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...matModules,
    NgReduxModule,  
    NgReduxRouterModule.forRoot(),
  ],
  exports: [
    ...matModules
  ],
  providers: [HttpClient, UsersService, AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private ngReduxRouter: NgReduxRouter
    ) {
   
      this.ngRedux.configureStore(rootReducer, {}, [],[ devTool.isEnabled() ? devTool.enhancer() : f => f]);
      ngReduxRouter.initialize(/* args */);   
  }
 
 }