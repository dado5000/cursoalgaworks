import { Body } from '@angular/http/src/body';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';


export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 4;
}

@Injectable()
export class PessoaService {

  pessoaURL = 'http://localhost:8080/pessoas';

  constructor(private http: Http) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new Headers();
    const params = new URLSearchParams();

    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

        params.set('page', filtro.pagina.toString());
        params.set('size', filtro.itensPorPagina.toString());

        if (filtro.nome) {
          params.set('nome', filtro.nome);
        }

    return this.http.get(`${this.pessoaURL}`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJason = response.json();
        const pessoas = responseJason.content;

        const resultado = {
          pessoas,
          total: responseJason.totalElements
        };
        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(this.pessoaURL, {headers} )
    .toPromise()
    .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoaURL}/${codigo}`, { headers })
    .toPromise()
    .then( () => null );
  }

mudarStatus(codigo: number, ativo: boolean): Promise<void> {
  const headers = new Headers();
  headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
  headers.append('Content-Type', 'application/json');

  return this.http.put(`${this.pessoaURL}/${codigo}/ativo`, ativo, { headers })
  .toPromise()
  .then( () => null );
}

}
