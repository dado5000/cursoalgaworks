// var, let e const

//var -> HOISTING variável vive mesmo fora do seu escopo, ou bloco q foi criado
//let -> variável vive apenas no bloco onde foi criada e não é acessada de fora **RECOMENDADA**
//const -> Variável constante e nunca tem seu valor modificado **RECOMENDADA**
function iniciarTime(iniciaJogoUberlandia: Boolean){
    const nome: string = 'Messe e amigos';
    let cidade: string = 'São Paulo';

    if(iniciaJogoUberlandia){
        cidade = 'Uberlância';
    }

    console.log(` ${nome} vão jogar em ${cidade} `);   
}

iniciarTime(true);