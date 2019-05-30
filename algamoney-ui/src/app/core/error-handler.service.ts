import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { NotAuthenticatedError } from 'app/seguranca/money-http';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private messageSerice: MessageService,
    private router: Router
    ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
       msg = errorResponse;

    } else if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sessão expirada. Faça login novamente.'
      this.router.navigate(['/login']);

    } else if (errorResponse instanceof HttpErrorResponse
        && errorResponse.status >= 400 && errorResponse.status <= 499) {
        msg = 'Ocorreu um erro ao processar a sua solicitação';

        if ( errorResponse.status === 403 ) {
          msg = 'Usuário sem permissão.'
        }

        try {
            msg = errorResponse.error[0].mensagemUsuario;
        } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

  } else {
      msg = 'Erro no serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro.', errorResponse);
    }

    this.messageSerice.add({severity: 'error', detail: msg});
  }

}
