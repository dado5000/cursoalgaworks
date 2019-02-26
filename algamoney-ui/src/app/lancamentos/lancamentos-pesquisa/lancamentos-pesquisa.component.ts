import { LancamentoService, LancamentoFiltro } from './../lancamento.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent  implements OnInit {

  filtro = new LancamentoFiltro();
  lancamentos = [];
  pt: any;

  constructor(private lancamentoService: LancamentoService ) { }

  ngOnInit() {

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

    this.pesquisar();
  }

  pesquisar() {
    this.lancamentoService.pesquisar( this.filtro )
      .then( resultado => {
        this.lancamentos = resultado.lancamentos;
      } );
  }

}
