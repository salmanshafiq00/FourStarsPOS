import {  HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbToast, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestDataService } from './Core/Services/rest.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { FeaturesModule } from './Modules/features.module';
import { LayoutModule } from './Shared/layout/layout.module';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './Shared/guard/auth-guard';
import { LoginComponent } from './Shared/authentication/login/login-component';
import { RegisterComponent } from './Shared/authentication/Register/register-component';


@NgModule({
  declarations: [
    AppComponent,  LoginComponent, RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule, 
    LayoutModule,
    FormsModule, HttpClientModule, NgbModule, FeaturesModule, JwtModule, NgbToastModule
  ],
  providers: [RestDataService, AuthGuard, NgbToast],
  bootstrap: [AppComponent]
})
export class AppModule { }
