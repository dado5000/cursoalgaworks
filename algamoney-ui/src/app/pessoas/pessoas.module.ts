import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/components/button/button';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputMaskModule,
    DataTableModule,
    TooltipModule,
    InputTextModule,
    ButtonModule
  ],
  declarations: [
    PessoasCadastroComponent,
    PessoasGridComponent,
    PessoasPesquisaComponent
  ],
  exports: [
    PessoasPesquisaComponent,
    PessoasCadastroComponent
  ]
})
export class PessoasModule { }
