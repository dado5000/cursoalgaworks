const precos = ['10', '23', '19'];

const acimaDeVinte = precos
    .filter(preco => preco > 20)
    .map(preco => ` R$ ${preco},00 `);//Tamplate String `` craze, texto dentro com variável `${variavel aqui}`
        
console.log(acimaDeVinte);