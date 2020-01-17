const Dev = require('../models/Dev');
const parseStringAsArray = require ('../utils/parseStringAsArray');


module.exports = {
    async index(request, response){
        const { latitude, longitude, techs } = request.query;
         
        const techsArray = parseStringAsArray(techs);

        //LISTANDO OS DEVS
        const devs = await Dev.find({
            techs: {
                $in: techsArray //OPERADOR LÓGICO DO MONGODB
            },
            location: {
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        return response.json({ devs });
    }
}