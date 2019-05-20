import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from './../shared/shared.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CalendarModule,
    ProgressSpinnerModule,
    RelatoriosRoutingModule
  ],
  declarations: [RelatorioLancamentosComponent]
})
export class RelatoriosModule { }
