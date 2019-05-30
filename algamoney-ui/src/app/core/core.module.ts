import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

import { CategoriaService } from './../categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { AuthService } from './../seguranca/auth.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { RelatoriosService } from 'app/relatorios/relatorios.service';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from 'primeng/growl';

import { JwtHelperService } from '@auth0/angular-jwt';
import { MoneyHttp } from 'app/seguranca/money-http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,

    GrowlModule,
    ConfirmDialogModule,
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    GrowlModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    CategoriaService,
    DashboardService,
    RelatoriosService,
    MoneyHttp,

    ConfirmationService,
    MessageService,
    JwtHelperService,
    AuthService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }
