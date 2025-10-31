import { Tablero } from "./tablero.js";
// --------------------------- NIVELES ---------------------------
// Defino evento hover al pasar el ratón sobre los distintos niveles
let nivel = $(".nivel-juego")
nivel.hover(
    function () {
        $(this).addClass("nivel-hover")
    },
    function () {
        $(this).removeClass("nivel-hover")
    }
)

// Creo una variable global para guardar el nivel elegido
let nivelSeleccionado = null;
function nivelJuego() {
    let nivel = $(".nivel-juego")

    nivel.off("click").on("click", function () {
        // Quito la clase "nivel-seleccionado" de todos
        $(".nivel-juego").removeClass("nivel-seleccionado");

        // Agrego la clase solo al seleccionado
        $(this).addClass("nivel-seleccionado");

        // Asigno el nivel
        nivelSeleccionado = $(this).text();

        // Tras seleccionar el nivel, lo muestro en el encabezado del juego
        $(".nivel-titulo").html(`NIVEL <br><span>${nivelSeleccionado}</span>`);

        // Creo el tablero dependiendo del nivel
        switch (nivelSeleccionado) {
            case "PRINCIPIANTE":
                Tablero.crearTablero(5, 5);
                break;
            case "INTERMEDIO":
                Tablero.crearTablero(7, 7);
                break;
            case "AVANZADO":
                Tablero.crearTablero(10, 10);
                break;
        }
    })
}

function obtenerNivelSeleccionado() {
    return nivelSeleccionado;
}

// Reseteo el nivel seleccionado (al hacer click reiniciar o salir)
function resetNivel() {
    nivelSeleccionado = null;
    $(".nivel-juego").removeClass("nivel-seleccionado");
    $(".nivel-titulo").html(`NIVEL <br><span></span>`);
}

export const Niveles = {
    obtenerNivelSeleccionado,
    nivelJuego,
    resetNivel
};