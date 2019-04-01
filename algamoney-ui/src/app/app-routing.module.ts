import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';


const routes: Routes  = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  /* Qualquer rota que não seja as acima, cai na rota '**' */
  { path: '**', redirectTo: 'pagina-nao-encontrada', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
