import * as express from 'express';
import { Usuario } from '../../models/usuario';

export const deleteUsuarioRouter = express.Router();

/**
 * Funcion que elimina un usuario de la base de datos segun un nombre
 * Comprueba que se reciba el nombre del usuario y que esta exista en la bbdd.
 * En caso afirmativo la elimina y en cualquier otro caso informa de un error.
*/
deleteUsuarioRouter.delete('/usuario', async (req, res) => {
  if (!req.query.nombre) {
    return res.status(400).send({
      error: 'Se debe proveer un nombre',
    });
  }

  try {
    const usuario =
      await Usuario.findOneAndDelete({ nombre: req.query.nombre.toString() });

    if (!usuario) {
      return res.status(404).send();
    }

    return res.send(usuario);
  } catch (error) {
    return res.status(400).send();
  }
});
