import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasCadastroComponent } from './pessoas/pessoas-cadastro/pessoas-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';


const routes: Routes  = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'lancamentos', component: LancamentosPesquisaComponent },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
  { path: 'pessoas', component: PessoasPesquisaComponent },
  { path: 'pessoas/nova', component: PessoasCadastroComponent },
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
