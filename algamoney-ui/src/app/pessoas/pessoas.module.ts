import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { SharedModule } from './../shared/shared.module';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputMaskModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    InputMaskModule,
    PanelModule,
    DialogModule,
    DropdownModule,

    SharedModule,
    PessoasRoutingModule
  ],
  declarations: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent,
    PessoaCadastroContatoComponent
  ],
  exports: [

  ]
})
export class PessoasModule { }
