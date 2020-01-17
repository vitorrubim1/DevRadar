//importando o express
const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-w5af7.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //BASE DE DADOS

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333); //declara o caminho para o local host (a porta)