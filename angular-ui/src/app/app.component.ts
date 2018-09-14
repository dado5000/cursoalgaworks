import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nome = "Daverson";

  adicionar(nome: string) {

    const numero = Math.round(Math.random() * 100);

    this.nome = `João ${numero}`;
  } 
}
