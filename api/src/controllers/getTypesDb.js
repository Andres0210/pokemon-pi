const { Type } = require('../db');
const axios = require('axios');

const getAllTypes = async () => {

   
        const typesData = await axios.get("https://pokeapi.co/api/v2/type");
        const types = await typesData.data.results.map(type => {
            return type.name
        });
        types.forEach(el => {
            Type.findOrCreate({
                where: { name: el }
            })
        })
        const allTypes = await Type.findAll();
        if (!allTypes) throw new Error('No hay Types en la DB')
        return allTypes
   
}

module.exports = getAllTypes;