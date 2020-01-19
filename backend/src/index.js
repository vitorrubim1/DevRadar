//importando o express
const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket')

const app = express();
const server = http.Server(app); //servidor fora do express

setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-w5af7.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //BASE DE DADOS

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333); //declara o caminho para o local host (a porta)