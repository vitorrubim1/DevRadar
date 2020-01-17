const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require ('../utils/parseStringAsArray');

module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs); 
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body; //CORPO DE REQUISIÇÃO

        //VERIFICAR SE JÁ TEM USUÁRIO CADASTRADO
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            //RESPOSTA DA API DO GITHUB, AXIOS
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            //RESGATANDO OS DETERMINADOS VALORES DO GITHUB
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray =  parseStringAsArray(techs); //é importado e transforma as tecnologia em array

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }

        return response.json(dev);
    }
}