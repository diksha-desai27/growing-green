//Built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { HttpClientModule, HTTP_INTERCEPTORS }  from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Interceptors
import { AuthInterceptor } from './Services/authconfig.interceptor';

//Components
import { AboutUsComponent } from './views/about-us/about-us.component';
import { PrivacyPolicyComponent } from './views/privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './views/terms-and-conditions/terms-and-conditions.component';
import { DonateComponent } from './views/donate/donate.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { HomeComponent } from './views/home/home.component';
import { EventsComponent } from './views/events/events/events.component';
import { AuthComponent } from './views/auth/auth.component';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { EventsService } from './Services/events.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventsPipe } from './filters/events.pipe';
import { EventDescriptionComponent } from './views/events/event-description/event-description.component';
import { ShareButtonModule } from '@ngx-share/button';
import { ShareButtonsConfig, IShareButtons } from '@ngx-share/core';
import { MyAccountComponent } from './views/my-account/my-account.component';
import { ImpactwebglComponent } from './views/impactwebgl/impactwebgl.component';
import { LoggerService }from './Services/logger.service';
import {AuthGuard} from './guards/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import {NotificationService} from './Services/notification.service';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      '722183973612-a9vgs545eu9ivujdujpmkoqtgndlgoil.apps.googleusercontent.com'
    ),
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('225702215310687'),
  },
]);

export function provideConfig() {
  return config;
}

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'login', component: AuthComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'events-description/:id', component: EventDescriptionComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'privacyPolicy', component: PrivacyPolicyComponent },
  { path: 'termsAndConditions', component: TermsAndConditionsComponent },
  { path: 'my-account/:id',component: MyAccountComponent ,canActivate:[AuthGuard] },
  { path: 'impact', component: ImpactwebglComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    EventsComponent,
    AboutUsComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    DonateComponent,
    EventDescriptionComponent,
    AuthComponent,
    MyAccountComponent,
    EventsPipe,
    ImpactwebglComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    NgxPayPalModule,
    ReactiveFormsModule,
    SocialLoginModule,
    FormsModule,
    HttpClientModule,
    ShareButtonsModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    EventsService,
    LoggerService,
    NotificationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
