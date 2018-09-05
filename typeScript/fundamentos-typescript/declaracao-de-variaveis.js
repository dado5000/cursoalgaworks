// var, let e const
//var -> HOISTING variável vive mesmo fora do seu escopo, ou bloco q foi criado
//let -> variável vive apenas no bloco onde foi criada e não é acessada de fora **RECOMENDADA**
//const -> Variável constante e nunca tem seu valor modificado **RECOMENDADA**
function iniciarTime(iniciaJogoUberlandia) {
    var nome = 'Messe e amigos';
    var cidade = 'São Paulo';
    if (iniciaJogoUberlandia) {
        cidade = 'Uberlância';
    }
    console.log(" " + nome + " v\u00E3o jogar em " + cidade + " ");
}
iniciarTime(true);
