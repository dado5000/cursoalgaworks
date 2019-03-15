import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  constructor(
    private pessoaService: PessoaService,
    private toastyServiceMessage: ToastyService,
    private errorHandler: ErrorHandlerService
    ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
     this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.toastyServiceMessage.success(`${this.pessoa.nome} cadastrado(a) com sucesso!`);

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
