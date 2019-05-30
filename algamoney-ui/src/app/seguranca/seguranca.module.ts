import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestOptions, Http } from '@angular/http';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { MoneyHttp } from './money-http';
import { LoginComponent } from './login/login.component';

import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';
import { environment } from 'environments/environment';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhiteListedDomains,
        blacklistedRoutes: environment.tokenBlackListedRoutes
      }
    }),
    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
