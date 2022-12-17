import * as express from 'express';
import { Usuario } from '../../models/usuario';

export const getUsuarioRouter = express.Router();

/**
 * Funcion que obtiene a un usuario de la base de datos segun un nombre.
 * Comprueba que se disponga del parametro nombre en la query
 * y crea el filtro para la base de datos tratandolo como una cadena.
 * La bbdd se filtra y si se obtiene algun usuario se devuelve, en
 * caso contrario se informa de un error.
*/
getUsuarioRouter.get('/usuario', async (req, res) => {
  const filter = req.query.nombre ? { nombre: req.query.nombre.toString() } : {};

  try {
    const usuario = await Usuario.find(filter);

    if (usuario.length !== 0) {
      return res.send(usuario);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});