import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Pessoa, Estado, Cidade } from 'app/core/model';
import { environment } from 'environments/environment';


export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 4;
}

@Injectable()
export class PessoaService {

  pessoaURL: string;
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: AuthHttp) {
    this.pessoaURL = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
   }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();


        params.set('page', filtro.pagina.toString());
        params.set('size', filtro.itensPorPagina.toString());

        if (filtro.nome) {
          params.set('nome', filtro.nome);
        }

    return this.http.get(`${this.pessoaURL}`, { search: params })
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

    return this.http.get(this.pessoaURL)
    .toPromise()
    .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.pessoaURL}/${codigo}`)
    .toPromise()
    .then( () => null );
  }

mudarStatus(codigo: number, ativo: boolean): Promise<void> {

  return this.http.put(`${this.pessoaURL}/${codigo}/ativo`, ativo)
  .toPromise()
  .then( () => null );
}

adicionar(pessoa: Pessoa): Promise<Pessoa> {

  return this.http.post(this.pessoaURL,
      JSON.stringify(pessoa))
    .toPromise()
    .then(response => response.json());
}

// Serviço da API utilizando PUT do http
atualizar(pessoa: Pessoa): Promise<Pessoa> {

  return this.http.put(`${this.pessoaURL}/${pessoa.codigo}`,
      JSON.stringify(pessoa))
    .toPromise()
    .then(response => {
      const pessoaAtualizada = response.json() as Pessoa;

      return pessoaAtualizada;
    });
}

  // Serviço fornecido pela API
  buscarPorCodigo(codigo: Number): Promise<Pessoa> {

    return this.http.get(`${this.pessoaURL}/${codigo}`)
      .toPromise()
      .then(response => {
        const pessoa = response.json() as Pessoa;

        return pessoa
      });
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get(this.estadosUrl).toPromise()
      .then(response => response.json());
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    const params = new URLSearchParams();
    params.set('estado', estado);

    return this.http.get(this.cidadesUrl, {
      search: params
    }).toPromise()
      .then(response => response.json());
  }

}
