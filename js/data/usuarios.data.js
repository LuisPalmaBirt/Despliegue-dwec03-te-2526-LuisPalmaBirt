import { Usuario } from "../models/usuario.model.js";

const usuarios_db = 
`[
    {
        "id": 1,
        "nombre": "Iker",
        "apellido": "Arana",
        "usuario": "iarana",
        "contrasenia": "1234Abcd"
    },
    {
        "id": 2,
        "nombre": "Ander",
        "apellido": "Goikoetxea",
        "usuario": "agoikoetxea",
        "contrasenia": "5678Efgh"
    },
    {
        "id": 3,
        "nombre": "Jokin",
        "apellido": "Olano",
        "usuario": "jolano",
        "contrasenia": "9012Ijkl"
    }
]`;

// Parseo los datos a JSON
let datosParseados = JSON.parse(usuarios_db);

// Recorro los datos y creo un objeto de tipo Usuario por cada registro que exista en usuarios_db
let listaObjetosUsuario = [];
for (let usuario of datosParseados) {
    listaObjetosUsuario.push(
        new Usuario(
            usuario.id,
            usuario.nombre,
            usuario.apellido,
            usuario.usuario,
            usuario.contrasenia
        )
    );
}
export const USUARIOS_DB = listaObjetosUsuario;