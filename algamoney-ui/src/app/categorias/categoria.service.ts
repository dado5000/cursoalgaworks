import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { environment } from 'environments/environment';

@Injectable()
export class CategoriaService {

  categoriasURL: string;

  constructor(private http: AuthHttp) {
    this.categoriasURL = `${environment.apiUrl}/categorias`;
   }

  listarTodas(): Promise<any> {

    return this.http.get(this.categoriasURL)
    .toPromise()
    .then(response => response.json());
  }

}
