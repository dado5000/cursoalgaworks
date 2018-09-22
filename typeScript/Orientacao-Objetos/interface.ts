//Inteface Pessoa obrigando a passar os parametros definidos nos objetos criados
// sexo? -> Atributo ? diz que não é obrigatório passar o parametro no objeto
interface Pessoa {
    idade: number;
    sexo?: string;
}

function imprimirIdade(pessoa: Pessoa ){
    console.log(pessoa.idade);
}

let joaoMarcos = {nome: 'João Marcos', idade: 22};

imprimirIdade(joaoMarcos);