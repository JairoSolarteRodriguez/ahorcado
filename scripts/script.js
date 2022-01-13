// Contenedor de la palabra y palabras para el juego
const contenedor = document.querySelector('.contenedor__letras'), // Contenedor de la palabra
abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'], //Abecedario para poner los botones
contenedorAbc = document.getElementById('abc'); //Contenedor padre del teclado

let palabras = [
    {word: 'gato', clue: 'Pista: Gato'},
    {word: 'juego', clue: 'Pista: juego'},
    {word: 'plato', clue: 'Pista: plato'},
    {word: 'camino', clue: 'Pista: camino'},
    {word: 'jirafa', clue: 'Pista: jirafa'},
    {word: 'cooperar', clue: 'Pista: cooperar'},
    {word: 'programar', clue: 'Pista: programar'},
    {word: 'elefante', clue: 'Pista: elefante'},
    {word: 'camilla', clue: 'Pista: camilla'},
    {word: 'robot', clue: 'Pista: robot'},
    {word: 'trofeo', clue: 'Pista: trofeo'},
    {word: 'martillo', clue: 'Pista: martillo'},
]; // Array de palabras a encontrar

let palabra = palabras[Math.floor((Math.random() * palabras.length))], // Obtener palabra random de la lista
palabraFinal = palabra.word;
posiciones = document.getElementsByClassName('letra'); // Recuardros de las letras
vidas = 0,// vidas
aciertos = 0; // Variables de aciertos

// Dibuja los botones con las letras
for(let abcedario in abc){
    contenedorAbc.innerHTML += `<input type="button" class="tecla" value="${abc[abcedario]}" id="${abc[abcedario]}" onclick="procesar('${abc[abcedario]}')">`;
}

// Dibuja las lineas en pantalla
console.log(palabraFinal);

for(let p in palabraFinal){
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
        vidas++;
        if(window.innerWidth < 1025){
            document.querySelector('#ahorcado').style.backgroundPosition = `${-(191.7*vidas)}px`;
        }else{
            document.querySelector('#ahorcado').style.backgroundPosition = `${-(314.55 *vidas)}px`;
        }
    }
}

// Verifica cuantas vidas hay y acabar o no el juego
function verificarVidas() {
    // Si las vidas se acaban pierde y se quita el teclado para que no agregue más letras
    if(vidas == 7){
        document.getElementById('gameover').innerText = `Perdiste la palabra era ${palabraFinal.toLocaleUpperCase()}`;
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
        if(aciertos == palabraFinal.length){ // Si los aciertos sin iguales al tamaño de la palabra gana
            document.getElementById('gameover').innerText = 'Ganaste';
            document.getElementById('ahorcado').style.backgroundImage = `url("img/win.svg")`;
            document.getElementById('ahorcado').style.backgroundSize = `cover`;
            contenedorAbc.innerHTML = null;
        }
    }
}

function buscarLetra(l){
    //Buscar el indice donde se encuentra la letra
    let letra = l,
    indices = [],
    indice = palabraFinal.indexOf(letra);

    if(letra.length == 1){
        while(indice != -1){
            indices.push(indice);
            indice = palabraFinal.indexOf(letra, indice + 1);
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

function showClue() {
    alert(palabra.clue);
}