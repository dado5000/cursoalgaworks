import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nome = "Daverson";

  adicionar(nome: string) {
    this.nome = nome;
  } 

  alteraNome (event: any){
      this.nome = event.target.value;
   }



}
