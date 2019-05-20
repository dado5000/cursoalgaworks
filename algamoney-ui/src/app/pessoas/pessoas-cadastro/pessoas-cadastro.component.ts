import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Pessoa } from 'app/core/model';
import { PessoaService } from './../pessoa.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';

import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-pessoas-cadastro',
  templateUrl: './pessoas-cadastro.component.html',
  styleUrls: ['./pessoas-cadastro.component.css']
})
export class PessoasCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

  constructor(
    private pessoaService: PessoaService,
    private toastyServiceMessage: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
    ) { }

  ngOnInit() {
    /* Setando título da página dinamicamente */
    this.title.setTitle('Pessoas - Nova');

    /* Pegando valor do código do lançamento atraves de parametro pela rota */
    const codigoPessoa = this.route.snapshot.params['codigo'];
      if (codigoPessoa) {
        this.carregarPessoa(codigoPessoa);
      }

      this.carregarEstados();
  }
   /* Métodos da CRUD  ****************************************************************************/

   carregarEstados() {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado).then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

   get editando() {
    return Boolean(this.pessoa.codigo);
  }

  nova(form: FormControl) {
    /* Limpa o formulário */
    form.reset();

    /* Função JavaScript do 'setTimeout' que corrige a nova instancia do objeto
    *  após a reset, o valor padrão não é atribuido
    */
    setTimeout(function() {
      /* Instancia um novo objeto tipo Lancamento */
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.novaPessoa(form);
    }
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`);
  }

  /* Métodos de SERVIÇO  ****************************************************************************/
  novaPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada  => {
        this.toastyServiceMessage.success(`${this.pessoa.nome} cadastrado(a) com sucesso!`);

        /* Direciona o usuário para a pagina de edição do lançamento que acabou de adicionar */
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
          this.pessoa = pessoa;

          this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
            this.pessoa.endereco.cidade.estado.codigo : null;

          if (this.estadoSelecionado) {
            this.carregarCidades();
          }

          this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.toastyServiceMessage.success('Pessoa atualizada com sucesso!');

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
