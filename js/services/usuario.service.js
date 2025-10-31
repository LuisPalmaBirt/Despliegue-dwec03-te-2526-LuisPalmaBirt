import { USUARIOS_DB } from "../data/usuarios.data.js";
import { Usuario } from "../models/usuario.model.js";

// Guardo los usuario en el LS
function almacenarUsuarios() {
  for (let usuario of USUARIOS_DB) {
    localStorage.setItem(usuario.id, JSON.stringify(usuario));
  }
}

// Obtengo todos los usuarios como objeto Usuario
function obtenerUsuarios() {
  const usuarios = [];
  for (let i = 0; i < localStorage.length; i++) {
    let id = localStorage.key(i);
    let datos = localStorage.getItem(id);

    // Si hay datos, creo los objetos y los agrego al array usuarios
    if (datos) {
      const datosUsuario = JSON.parse(datos); // convierte de string a objeto
      const usuarioObjeto = new Usuario(datosUsuario.id,
        datosUsuario.nombre,
        datosUsuario.apellido,
        datosUsuario.usuario,
        datosUsuario.contrasenia);
      usuarios.push(usuarioObjeto);
    }
  }
  return usuarios
}

// Valido el login 
function validarLogin(usuario, contrasenia) {
  const usuarios = obtenerUsuarios();
  for (let datoUsuario of usuarios) {
    if (datoUsuario.usuario === usuario && datoUsuario.contrasenia === contrasenia) {
      return datoUsuario
    }
  }
  return null;
}

export const UsuarioService = {
  almacenarUsuarios,
  validarLogin
};