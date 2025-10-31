// --------------------------- JUEGO ---------------------------
function iniciarJuego(juego, resultado) {
    juego = $(juego);
    resultado = $(resultado);

    juego.show();
    cuentaAtras(juego, resultado);
}

let tiempoInicial = 30;
let tiempo = tiempoInicial;
let tiempoRestante;
function cuentaAtras(juego, resultado) {
    // Detengo si hay un intervalo en curso
    if (tiempoRestante) {
        clearInterval(tiempoRestante);
    }

    // Creo el temporizador
    const temporizador = $("#temporizador");
    temporizador.text(tiempo);

    tiempoRestante = setInterval(() => {
        tiempo--;
        temporizador.text(tiempo);

        if (tiempo <= 0) {
            resetTiempo();
            alert('🔋¡Batería agotada!');
            juego.hide();
            resultado.show();
            $("#resultado-mensaje").html("💥 Has perdido!!!");
        }
    }, 1000);
}

function obtenerTiempoRestante() {
    return tiempo;
}

function obtenerTiempoPartida() {
    return tiempoInicial - obtenerTiempoRestante();
}

// Reseteo el tiempoRestante (al hacer click reiniciar o salir)
function resetTiempo() {
    clearInterval(tiempoRestante);
    tiempo = tiempoInicial;
    $("#temporizador").text(tiempo);
}

export const Juego = {
    iniciarJuego,
    obtenerTiempoRestante,
    obtenerTiempoPartida,
    resetTiempo
};