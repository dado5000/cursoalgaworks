import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';


import { ErrorHandlerService } from 'app/core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent  implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  pt: any;
  @ViewChild('tabelaPessoa') grid;

  constructor(
      private lancamentoService: LancamentoService,
      private errorHandler: ErrorHandlerService,
      private auth: AuthService,
      private messageService: MessageService,
      private confirmation: ConfirmationService,
      private title: Title
      ) { }

  ngOnInit() {

    this.title.setTitle('Lançamentos - Pesquisa');

    this.pt = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'segunda', 'terça', 'Quarta', 'Quinta', 'Sexta', 'sábado' ],
      dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
      dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      monthNames: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto',
                    'setembro', 'outubro', 'novembro', 'Dezembro' ],
      monthNamesShort: [ 'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez' ],
      today: 'Hoje',
      clear: 'limpar'
  }
    /* Descontinuado na aula 17.6 */
    // this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar( this.filtro )
      .then( resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
     });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
    .then( () =>  {
      // this.grid.first = 0;
      this.pesquisar(this.filtro.pagina);

      // Componente que fornece o recurso de mensagens ao usuário
      this.messageService.add({ severity: 'success', detail: 'Lançamento excluido com sucesso!'});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
