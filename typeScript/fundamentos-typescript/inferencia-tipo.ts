let quantidade = 20;
//quantidade = 'valor qualquer string'; não comila pois a variãvel está sendo atribuida por inferência
//Porém é recomendado que sempre devida o tipo da variável, boas práticas de programação. 

let x = [1, 2, null];
// x[0] = true; não compila !!!

// Contextual Typing, aqui o onmousedown sabe q espera um evento do tipo MouseEvent, então por inferência,
// o evento será do tipo MouseEvent
window.onmousedown = function(evento){
    console.log(evento.button);//ok
    // console.log(evento.button); não compila !!!
}