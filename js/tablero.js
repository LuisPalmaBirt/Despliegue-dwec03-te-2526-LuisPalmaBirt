import { juego, resultado } from "./main.js";
import { Juego } from "./juego.js";

// --------------------------- Tablero ---------------------------
function crearTablero(filas, columnas) {
    const celdasTotales = filas * columnas;
    const palabra = "MAZINGER";
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    // Primeramente aseguro que aparezcan las letras de la palabra MAZINGER
    const letras = palabra.split('');

    // Completo el resto de celdas con letras aleatorias del alfabeto
    while (letras.length < celdasTotales) {
        const letraAdicional = alfabeto[Math.floor(Math.random() * alfabeto.length)]
        letras.push(letraAdicional);
    }

    // Mezclo el array
    letras.sort(() => Math.random() - 0.5);

    const tablero = $('#tablero');
    const palabraSection = $('#palabra-section');

    // Limpio el tablero y palabraSection cada vez que inicio
    tablero.empty();
    palabraSection.empty()

    // ------------- CONSTRUCCION DEL TABLERO -------------
    // Creo las columnas
    tablero.css('grid-template-columns', `repeat(${columnas}, 1fr)`);

    // Creo el tablero
    for (let i = 0; i < letras.length; i++) {
        const celda = $('<div>').addClass('celda');

        // Aniado la letra a la celda
        celda.text(letras[i]);
        // Aniado celda al tablero
        tablero.append(celda);
    }

    // ------------- CONSTRUCCION DE LA PALABRA MAZINGER -------------
    // Muestro la palabra
    for (let letra of palabra) {
        palabraSection.append(`<span class="letra"></span>`);
    }

    // Desarrollo los clicks
    let indiceActual = 0; // La primera letra sera la M

    $('.celda').click(function () {
        const celda = $(this)
        const letraSeleccionada = celda.text();
        // Si ya estaba acertada, no hace nada
        if (celda.hasClass('acertada')) return;

        // Compara con la letra esperada
        const letraEsperada = palabra[indiceActual];

        // Muestro la letra al hacer click
        celda.addClass('seleccionada');

        if (letraSeleccionada === letraEsperada) {
            celda.addClass('acertada');

            // Muestro la letra en la palabra
            $('#palabra-section .letra').eq(indiceActual).text(letraSeleccionada).addClass('encontrada');

            indiceActual++; // Avanzo a la siguiente letra
        }

        // Si se completa la palabra finaliza la partida
        if (indiceActual == palabra.length) {
            let tiempoPartida = Juego.obtenerTiempoPartida();
            juego.hide();
            resultado.show();
            $("#resultado-mensaje").html(`🤖 🤖 🤖  Has ganado!!! 🤖 🤖 🤖 <br>Has completado la palabra MAZINGER en ${tiempoPartida} segundos`);
            Juego.resetTiempo();
        }

        // Al salir del mouse despues del click
        celda.mouseout(function () {
            // Si no es acertada, oculto letra
            if (!celda.hasClass('acertada')) {
                setTimeout(() => {
                    celda.removeClass('seleccionada');
                }, 50);
            }
        })
    })
}

export const Tablero = {
    crearTablero
};