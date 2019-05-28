import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';


import * as moment from 'moment';

import { Lancamento } from 'app/core/model';
import { environment } from 'environments/environment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 4;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    // const headers = new Headers(); USADO COM BASCI Security
    // headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        params.set('page', filtro.pagina.toString());
        params.set('size', filtro.itensPorPagina.toString());

        if (filtro.descricao) {
          params.set('descricao', filtro.descricao);
        }
        if (filtro.dataVencimentoInicio) {
          params.set('dataVencimentoDe',
            moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
        }
        if (filtro.dataVencimentoFim) {
          params.set('dataVencimentoAte',
            moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
        }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { search: params })
      .toPromise()
      .then(response => {
        const responseJason = response.json();
        const lancamentos = responseJason.content;

        const resultado = {
          lancamentos,
          total: responseJason.totalElements
        };
        return resultado;
      })
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then( () => null );
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.post(this.lancamentosUrl,
        JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());
  }

  // Serviço da API utilizando PUT do http
  atualizar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,
        JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  // Serviço fornecido pela API
  buscarPorCodigo(codigo: Number): Promise<Lancamento> {

    return this.http.get(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}
