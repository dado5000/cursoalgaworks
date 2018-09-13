class Funcionario {

    nome: String;
    salario: number;

    constructor(nome: string, salario: number){
        this.nome = nome;
        this.salario = salario;
    }

    pagarImposto(taxa: number = 7.5){
        console.log(` ${this.nome} pagou ${this.salario * taxa / 100} reais de imposto.`)
    }
    
}

class Secretario extends Funcionario {

}

class Executivo extends Funcionario {

    //Herança
    pagarImposto(taxa: number = 27.5){
        console.log(`Executivo paga mais!`)
        super.pagarImposto(taxa);
    } 

}

//Herança
let sarah = new Funcionario(`Sarah`, 2000);
sarah.pagarImposto();

let jorge = new Executivo(`Jorge`, 30000);
jorge.pagarImposto();