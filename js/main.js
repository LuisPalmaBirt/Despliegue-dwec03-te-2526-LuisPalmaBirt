"use strict"

import { UsuarioService } from "./services/usuario.service.js";
import { Niveles } from "./niveles.js";
import { Juego } from "./juego.js";

$(document).ready(function () {
    mostrarLogin();
});

const login = $("#login-section");
const bienvenida = $("#bienvenida-section");
export const juego = $("#juego-section");
export const resultado = $("#resultado-section");

function mostrarLogin() {
    login.show();
    bienvenida.hide();
    juego.hide();
    resultado.hide();

    // Inicializo los usuarios del LS
    UsuarioService.almacenarUsuarios();

    $("#entrar-button").click(function () {
        const usuario = $("#usuario").val()?.trim();
        const contrasenia = $("#contrasenia").val()?.trim();

        // Valido solo letras y numeros
        const letrasYNumeros = /^[A-Za-z0-9]+$/;

        if (!letrasYNumeros.test(contrasenia)) {
            alert("⚙️ La contraseña solo puede contener letras y números.");
            return;
        }

        const usuarioEncontrado = UsuarioService.validarLogin(usuario, contrasenia);
        if (usuarioEncontrado) {
            alert(`Bienvenido ${usuarioEncontrado.nombre} ${usuarioEncontrado.apellido}\n\n🤖 ¡Mazinger Z ACTIVADO!`);
            login.hide();
            mostrarBienvenida();
        } else {
            alert("💥 Los datos son incorrectos");
        }
    })
}

function mostrarBienvenida() {
    bienvenida.show();

    // Selecciono el nivel
    Niveles.nivelJuego()
}

// Al hacer click, comienza el juego
$("#jugar-button").on("click", function () {
    if (!Niveles.obtenerNivelSeleccionado()) {
        alert("🚀 Selecciona un nivel antes de comenzar.");
        return;
    } else {
        Juego.iniciarJuego(juego, resultado);
        bienvenida.hide();
    }
});

// Finalizo la partida al hacer click
$("#finalizar-button").click(function () {
    Juego.resetTiempo();
    juego.hide();
    resultado.show();
    $("#resultado-mensaje").html("💥 No has completado la partida!!!");

})


// Reinicio otra partida
$("#reiniciar").click(function () {
    resultado.hide();
    Niveles.resetNivel();
    bienvenida.show();
})

// Salgo completamente, vuelve al login
$("#salir").click(function () {
    document.getElementById("login-form").reset();
    resultado.hide();
    Niveles.resetNivel();
    login.show();
})
