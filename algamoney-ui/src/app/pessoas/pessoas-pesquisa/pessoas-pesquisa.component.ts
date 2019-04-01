import { Title } from '@angular/platform-browser';
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
export class PessoasPesquisaComponent implements OnInit  {


  pessoas = [];
  totalRegistros = 0;
  filtro = new PessoaFiltro();

  constructor(
      private pessoaService: PessoaService,
      private confirmation: ConfirmationService,
      private errorHandler: ErrorHandlerService,
      private toastyServiceMessage: ToastyService,
      private title: Title
      ) {}


  ngOnInit() {
    this.title.setTitle('Pessoas - Pesquisa');
  }

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
      this.toastyServiceMessage.success('Pessoa excluida com sucesso!');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  statusPessoas(pessoa: any)  {

    /* Minha solução ...
      if (pessoa.ativo === true) {
      pessoa.ativo = false;
    }else {
      pessoa.ativo = true;
    } */
    const novoStatus = !pessoa.ativo;
    /* Minha solução ...
      this.pessoaService.mudarStatus(pessoa.codigo, pessoa.ativo) */
    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then( () => {
        /* Minha solução ...
        if (pessoa.ativo === false) {
          this.toastyServiceMesagge.success('Pessoa inativada com sucesso!');
        }else {
          this.toastyServiceMesagge.success('Pessoa ativada com sucesso!');
        } */
       const acao = novoStatus ? 'ativada' : 'desativada';
       pessoa.ativo = novoStatus;
       this.toastyServiceMessage.success(`Pessoa ${acao} com sucesso!`);
      } )
  }

}
