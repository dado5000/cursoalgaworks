//boolean true ou false
let estaPago = true;

//number números inteiro ou fração
let idade: number = 28;
let valor: number = 29.99;

//string aspas simples ou duplas, apenas escolha um padrão e siga no inicio até o fim do projeto
let empresa: string = 'AlgaWorks';
let nome: string = 'Daverson';

//Template string, método de concateção de melhor legibilidade
console.log(`Olá meu nome é ${nome} e tenho ${idade} anos. `);

//array
let notas: number[] = [8, 6, 7, 9]

//tuple
let alunos: [string, number, string] = ['Daverson', 10, 'Cálculo 4'];
console.log(`${alunos[0]} tirou ${alunos[1]} em ${alunos[2]} `);

//Enum, usado para determinar valores não modificados padrões de melhor leitura
enum Cor {Verde, Amarelo, Azul, Vermelho};
let corFundo: Cor = Cor.Verde;

//Any
let algumValor: any = 4;
algumValor = 'Agora é uma string';
algumValor = true;
//Biblioteca Terceiros, onde não sabemos o tipo de dado retornado
//Migração de JS para TS
//Array com vários tipo de dados

//void
function alerta(): void{
    //... alert('Operação não permitida');
}

/* null e undefined -> Não faz muito sentido, mas ... são subtipos dos outros tipos, então posso atribuir
* null e undefined para os outros tipos
*/
let u: undefined = undefined;
let n: null = null;

nome = undefined;
nome = null;

