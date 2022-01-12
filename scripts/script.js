// Contenedor de la palabra y palabras para el juego
const contenedor = document.querySelector('.contenedor__letras'), // Contenedor de la palabra
palabras = ['gato', 'juego', 'plato', 'camino', 'jirafa', 'cooperar', 'programar', 'elefante', 'camilla', 'robot', 'trofeo', 'martillo'], // Array de palabras a encontrar
abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], //Abecedario para poner los botones
contenedorAbc = document.getElementById('abc'); //Contenedor padre del teclado

let palabra = palabras[Math.floor((Math.random() * palabras.length))], // Obtener palabra random de la lista
posiciones = document.getElementsByClassName('letra'); // Recuardros de las letras
vidas = 7,// vidas
aciertos = 0; // Variables de aciertos

// Dibuja los botones con las letras
for(let abcedario in abc){
    contenedorAbc.innerHTML += `<input type="button" class="tecla" value="${abc[abcedario]}" id="${abc[abcedario]}" onclick="procesar('${abc[abcedario]}')">`;
}

// Dibuja las lineas en pantalla
console.log(palabra);

for(let p in palabra){
    contenedor.innerHTML += `<div class="letra"></div>`;
}

// Presionar una tecla ejecuta esta funcion.
function procesar(letter){
    let letra = letter;

    indices = buscarLetra(letra);
    colocarLetra(indices, letra);
    verificarAciertos(indices);
    quitarVidas(indices);
    verificarVidas();

    // Quita el boton cuando ya se ha presionado
    quitarBoton(letra);
}

// Resta vidas cuando se equivoquen.
function quitarVidas(i) {
    let indices = i;
    // Quita vidas cuando se equivocan de palabra 
    if(indices.length == 0){
        vidas--;
        document.getElementById('ahorcado').innerHTML = `<img src="img/${vidas}.svg" class="img-ahorcado">`
    }
}

// Verifica cuantas vidas hay y acabar o no el juego
function verificarVidas() {
    // Si las vidas se acaban pierde y se quita el teclado para que no agregue más letras
    if(vidas == 0){
        document.getElementById('gameover').innerText = 'Perdiste';
        contenedorAbc.innerHTML = null;
    }
}

// Coloca las letras en el lugar correspondiente.
function colocarLetra(i, l) {
    let indices = i;
    let letra = l;
    // Coloca la letra en el lugar que corresponde
    for(let i in indices){
        posiciones[indices[i]].innerText = letra;
    }
}

function verificarAciertos(i) {
    // Verifica cuantos aciertos
    let indices = i;
    if(indices.length != 0){
        aciertos += indices.length;
        if(aciertos == palabra.length){ // Si los aciertos sin iguales al tamaño de la palabra gana
            document.getElementById('gameover').innerText = 'Ganaste';
            document.getElementById('ahorcado').innerHTML = `<img src="img/win.svg">`;
            contenedorAbc.innerHTML = null;
            // document.getElementById('ahorcado').innerHTML = null;
        }
    }
}

function buscarLetra(l){
    //Buscar el indice donde se encuentra la letra
    let letra = l,
    indices = [],
    indice = palabra.indexOf(letra);

    if(letra.length == 1){
        while(indice != -1){
            indices.push(indice);
            indice = palabra.indexOf(letra, indice + 1);
        }
        return indices;
    }else{
        alert('No se ha encontrado la letra que indico, para corregir este error recargue la página');
    }
    return indices;
}

function quitarBoton(id) {
    let boton = document.getElementById(`${id}`);
    if(boton != null){
        boton.style.display = 'none';
    }
}