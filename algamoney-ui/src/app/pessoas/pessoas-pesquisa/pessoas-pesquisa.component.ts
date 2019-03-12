import { PessoaService, PessoaFiltro } from './../pessoa.service';

import { Component, OnInit  } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [];
  totalRegistros = 0;
  filtro = new PessoaFiltro();

  constructor(
      private pessoaService: PessoaService,
      private confirmation: ConfirmationService,
      private errorHandler: ErrorHandlerService,
      private toastyServiceMesagge: ToastyService
      ) {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar( this.filtro )
      .then( resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      } );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
     });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
    .then( () =>  {
      // this.grid.first = 0;
      this.pesquisar(this.filtro.pagina);

      // Componente que fornece o recurso de mensagens ao usuário
      this.toastyServiceMesagge.success('Pessoa excluida com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
