import * as express from 'express';
import { Usuario } from '../../models/usuario';

export const patchUsuarioRouter = express.Router();

/**
 * Funcion que actualiza los datos de un usuario por nombre.
 * Comprueba que los atributos que se van a editar estan permitidos.
 * Crea el objeto para modificar y lo actualiza.
 * Devolviendo estados en consecuencia a los errores.
 */
patchUsuarioRouter.patch('/usuario', async (req, res) => {
  if (!req.query.nombre) {
    return res.status(400).send({
      error: 'Se debe proveer un nombre',
    });
  }

  const allowedUpdates = ['nombre', 'contraseña'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate =
    actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'Update is not permitted',
    });
  }

  try {
    const usuario =
      await Usuario.findOneAndUpdate({ nombre: req.query.nombre.toString() }, req.body, {
        new: true,
        runValidators: true,
      });

    if (!usuario) {
      return res.status(404).send();
    }

    return res.send(usuario);
  } catch (error) {
    return res.status(400).send(error);
  }
});
