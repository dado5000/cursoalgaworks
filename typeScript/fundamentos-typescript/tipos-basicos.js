//boolean true ou false
var estaPago = true;
//number números inteiro ou fração
var idade = 28;
var valor = 29.99;
//string aspas simples ou duplas, apenas escolha um padrão e siga no inicio até o fim do projeto
var empresa = 'AlgaWorks';
var nome = 'Daverson';
//Template string, método de concateção de melhor legibilidade
console.log("Ol\u00E1 meu nome \u00E9 " + nome + " e tenho " + idade + " anos. ");
//array
var notas = [8, 6, 7, 9];
//tuple
var alunos = ['Daverson', 10, 'Cálculo 4'];
console.log(alunos[0] + " tirou " + alunos[1] + " em " + alunos[2] + " ");
//Enum, usado para determinar valores não modificados padrões de melhor leitura
var Cor;
(function (Cor) {
    Cor[Cor["Verde"] = 0] = "Verde";
    Cor[Cor["Amarelo"] = 1] = "Amarelo";
    Cor[Cor["Azul"] = 2] = "Azul";
    Cor[Cor["Vermelho"] = 3] = "Vermelho";
})(Cor || (Cor = {}));
;
var corFundo = Cor.Verde;
//Any
var algumValor = 4;
algumValor = 'Agora é uma string';
algumValor = true;
//Biblioteca Terceiros, onde não sabemos o tipo de dado retornado
//Migração de JS para TS
//Array com vários tipo de dados
//void
function alerta() {
    //... alert('Operação não permitida');
}
/* null e undefined -> Não faz muito sentido, mas ... são subtipos dos outros tipos, então posso atribuir
* null e undefined para os outros tipos
*/
var u = undefined;
var n = null;
nome = undefined;
nome = null;
