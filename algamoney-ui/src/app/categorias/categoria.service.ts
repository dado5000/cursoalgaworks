import { MoneyHttp } from './../seguranca/money-http';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';

@Injectable()
export class CategoriaService {

  categoriasURL: string;

  constructor(private http: MoneyHttp) {
    this.categoriasURL = `${environment.apiUrl}/categorias`;
   }

  listarTodas(): Promise<any> {

    return this.http.get(this.categoriasURL)
    .toPromise();
  }

}
