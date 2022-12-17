import * as express from 'express';
import { Usuario } from '../../models/usuario';

export const postUsuarioRouter = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
/**
 * Funcion que crea un nuevo usuario y lo almacena en la base de datos.
 * Comprueba que los atributos que se van a editar estan permitidos.
 * Crea el objeto para modificar y lo actualiza.
 * Devolviendo estados en consecuencia a los errores.
 */
postUsuarioRouter.post('/usuario', async (req, res) => {
  bcrypt.hash(req.body.contraseña, saltRounds, function(err, hash) {
    req.body.contraseña = hash;
    const usuario = new Usuario(req.body);
    try {
      usuario.save();
      res.status(201).send(usuario);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
});