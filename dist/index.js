"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
//import './db/mongoose';
const getUsuario_1 = require("./routers/usuarioRouters/getUsuario");
const postUsuario_1 = require("./routers/usuarioRouters/postUsuario");
const deleteUsuario_1 = require("./routers/usuarioRouters/deleteUsuario");
const patchUsuario_1 = require("./routers/usuarioRouters/patchUsuario");
const default_1 = require("./routers/default");
const app = express_1.default();
app.use(express_1.default.json());
app.use(postUsuario_1.postUsuarioRouter);
app.use(getUsuario_1.getUsuarioRouter);
app.use(patchUsuario_1.patchUsuarioRouter);
app.use(deleteUsuario_1.deleteUsuarioRouter);
app.use(default_1.defaultRouter);
const port = process.env.PORT || 3000;
mongoose_1.connect("mongodb+srv://test:test@cluster1.j5cwa87.mongodb.net/usuario?retryWrites=true&w=majority", {
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
