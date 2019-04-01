import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/components/button/button';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputMaskModule,
    DataTableModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,

    SharedModule,
    PessoasRoutingModule
  ],
  declarations: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent
  ],
  exports: [

  ]
})
export class PessoasModule { }
