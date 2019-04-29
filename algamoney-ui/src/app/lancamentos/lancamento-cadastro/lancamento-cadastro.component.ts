import { ToastyService } from 'ng2-toasty';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  // lancamento = new Lancamento();
  formulario: FormGroup;

  ngOnInit() {
    /* Contrução do formulário reativo */
    this.configurarFormulario();

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
    private title: Title,
    private formBuilder: FormBuilder
  ) {}

  /* Métodos da CRUD  ****************************************************************************/
  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  novo() {
    /* Limpa o formulário */
    this.formulario.reset();

    /* Função JavaScript do 'setTimeout' que corrige a nova instancia do objeto
    *  após a reset, o valor padrão não é atribuido
    */
    setTimeout(function() {
      /* Instancia um novo objeto tipo Lancamento */
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [],
      descricao: [null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      observacao: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

  /* Métodos de SERVIÇO  ****************************************************************************/
  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
          this.formulario.patchValue(lancamento);
          this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        /* patchValue faz com que só as propriedades que estão sendo manipulado no momento sejam enviadas e não
        *  todas as propriedades do objeto */
        this.formulario.patchValue(lancamento);

        this.toastyServiceMessage.success('Lançamento Atualizado com sucesso!');

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
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
