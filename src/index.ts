import express from 'express';
import {connect} from 'mongoose';
//import './db/mongoose';

import {getUsuarioRouter} from './routers/usuarioRouters/getUsuario';
import {postUsuarioRouter} from './routers/usuarioRouters/postUsuario';
import {deleteUsuarioRouter} from './routers/usuarioRouters/deleteUsuario';
import {patchUsuarioRouter} from './routers/usuarioRouters/patchUsuario';


import {defaultRouter} from './routers/default';
import { Mongoose } from 'mongoose';

const app = express();
app.use(express.json());

app.use(postUsuarioRouter);
app.use(getUsuarioRouter);
app.use(patchUsuarioRouter);
app.use(deleteUsuarioRouter);

app.use(defaultRouter);

const port = process.env.PORT || 3000;

connect("mongodb+srv://test:test@cluster1.j5cwa87.mongodb.net/usuario?retryWrites=true&w=majority", {
//connect("mongodb://mongo:Gov2RPqPBa3P05QTtH5E@containers-us-west-172.railway.app:5805", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(error => {
  console.log(error);
});



app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
