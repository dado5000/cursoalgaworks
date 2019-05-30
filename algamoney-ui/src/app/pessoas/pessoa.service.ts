import { MoneyHttp } from './../seguranca/money-http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

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

  constructor(private http: MoneyHttp) {
    this.pessoaURL = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
   }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

        if (filtro.nome) {
          params = params.append('nome', filtro.nome);
        }

    return this.http.get<any>(`${this.pessoaURL}`, { params })
      .toPromise()
      .then(response => {

        const pessoas = response.content;

        const resultado = {
          pessoas,
          total: response.totalElements
        };
        return resultado;
      })
  }

  listarTodas(): Promise<any> {

    return this.http.get<any>(this.pessoaURL)
    .toPromise()
    .then(response => response.content);
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

  return this.http.post<Pessoa>(this.pessoaURL, pessoa)
    .toPromise();
}

// Serviço da API utilizando PUT do http
atualizar(pessoa: Pessoa): Promise<Pessoa> {
  return this.http.put<Pessoa>(`${this.pessoaURL}/${pessoa.codigo}`, pessoa)
    .toPromise();
}

  // Serviço fornecido pela API
  buscarPorCodigo(codigo: Number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoaURL}/${codigo}`)
      .toPromise();
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl).toPromise();
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    const params = new HttpParams()
      .append('estado', estado);

    return this.http.get<Cidade[]>(this.cidadesUrl, {
       params
    }).toPromise();
  }

}
