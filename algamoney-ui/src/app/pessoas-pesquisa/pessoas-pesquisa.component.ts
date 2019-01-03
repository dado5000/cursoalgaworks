import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  pessoas = [
    { nome: 'Padaria do José', cidade: 'Artur Nogueira', uf: 'SP', status: true },
    { nome: 'Atacado Brasil', cidade: 'Americana', uf: 'SP', status: false },
    { nome: 'Ministério da Fazenda', cidade: 'Brasilia', uf: 'DF', status: true },
    { nome: 'Escola Abelha Rainha', cidade: 'Comópolis', uf: 'SP', status: false },
    { nome: 'Sebastião Souza', cidade: 'Holambra', uf: 'SP', status: true },
    { nome: 'Casa Nova Imóveis', cidade: 'Sorocaba', uf: 'SP', status: false },
    { nome: 'Academia Top', cidade: 'Itatiba', uf: 'SP', status: false }
  ];
}
