const mongoose = require('mongoose');
const PointSchema = require ('./utils/PointSchema')

//ESTRUTURAÇÃO DE UMA ENTIDADE DENTRO DO BD
const DevSchema = new mongoose.Schema({

    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String], //ARMAZENA UMA OU MAIS STRINGS
    location: {
        type: PointSchema, //QUE É IMPORTADO
        index: '2dsphere'
    } 
});

module.exports = mongoose.model('Dev', DevSchema); 