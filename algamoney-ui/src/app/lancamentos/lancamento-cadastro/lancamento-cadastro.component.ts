import { ToastyService } from 'ng2-toasty';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'app/core/error-handler.service';
import { PessoaService } from 'app/pessoas/pessoa.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit  {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  ngOnInit() {

    /* Setando título da página dinamicamente */
    this.title.setTitle('Lançamento - Novo');

    /* Pegando valor do código do lançamento atraves de parametro pela rota */
    const codigoLancamento = this.route.snapshot.params['codigo'];
      if (codigoLancamento) {
        this.carregarLancamento(codigoLancamento);
      }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toastyServiceMessage: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  /* Métodos da CRUD  ****************************************************************************/
  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  novo(form: FormControl) {
    /* Limpa o formulário */
    form.reset();

    /* Função JavaScript do 'setTimeout' que corrige a nova instancia do objeto
    *  após a reset, o valor padrão não é atribuido
    */
    setTimeout(function() {
      /* Instancia um novo objeto tipo Lancamento */
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

  /* Métodos de SERVIÇO  ****************************************************************************/
  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
          this.lancamento = lancamento;
          this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;

        this.toastyServiceMessage.success('Lançamento Atualizado com sucesso!');

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(lancamentoAdicionado  => {
        this.toastyServiceMessage.success('Lançamento adicionado com sucesso!');

        /* Direciona o usuário para a pagina de edição do lançamento que acabou de adicionar */
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



}
