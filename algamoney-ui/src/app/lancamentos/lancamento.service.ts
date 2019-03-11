import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 4;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new Headers();
    const params = new URLSearchParams();

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

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

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, search: params })
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
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
    .toPromise()
    .then( () => null );
  }


}
