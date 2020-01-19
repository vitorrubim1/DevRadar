const socketio = require('socket.io');

const parseStringAsArray = require ('./utils/parseStringAsArray');
const calculateDistance = require ('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket =>{
        const { latitude, longitude, techs } = socket.handshake.query;

        //salvando as conexoes dentro da aplicacao
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs),
        });
    });
};

exports.findConnections = (coordinates, techs) => {
    //vou percorrer as conexoes e filtrar
    return connections.filter(connections =>{
        //vendo se o novo dev cadastrado, tem a distancia e as techs de 10km do user q esta na tela
        return calculateDistance(coordinates, connection.coordinates) < 10
        && connection.techs.some(item => techs.includes(item)) //vendo se pelo menos uma tech é igual
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
}