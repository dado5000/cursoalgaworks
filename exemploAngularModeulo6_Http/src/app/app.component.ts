import { CidadeService } from './cidade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cidades = [];

  constructor(private cidadeService: CidadeService) {}

  ngOnInit() {
    this.atualizaListaCidades();
  }

  atualizaListaCidades(){
    this.cidadeService.consultar()
      .then(dados => {
        this.cidades = dados;
      })
  }

  adicionar(nome: string) {
    this.cidadeService.adicionar({ nome })
    .then(cidade => {
      alert(` Cidade "${cidade.nome}" cadastrada com sucesso! Código: "${cidade.id}"  `);
      this.atualizaListaCidades();
    });

  }

  excluir(id: number) {
    this.cidadeService.excluir( id )
    .then( () => {
      alert(`Cidade excluida com sucesso!`);
      this.atualizaListaCidades();
    });
  }

  atualizar(cidade: any) {
    this.cidadeService.atualizar(cidade)
    .then( () => {
      alert('Cidade atualizada com sucesso!');
      this.atualizaListaCidades();
    })
    .catch(erro => {
      alert(erro);
    });
  }

}
