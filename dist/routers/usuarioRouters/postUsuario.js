"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const usuario_1 = require("../../models/usuario");
exports.postUsuarioRouter = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * Funcion que crea un nuevo usuario y lo almacena en la base de datos.
 * Comprueba que los atributos que se van a editar estan permitidos.
 * Crea el objeto para modificar y lo actualiza.
 * Devolviendo estados en consecuencia a los errores.
 */
exports.postUsuarioRouter.post('/usuario', async (req, res) => {
    bcrypt.hash(req.body.contraseña, saltRounds, function (err, hash) {
        req.body.contraseña = hash;
        const usuario = new usuario_1.Usuario(req.body);
        try {
            usuario.save();
            res.status(201).send(usuario);
        }
        catch (error) {
            res.status(400).send(error);
        }
    });
});
