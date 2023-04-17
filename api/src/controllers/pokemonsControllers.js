const axios = require('axios');
const { Pokemon, Type } = require('../db');

// GET /pokemons ----Obtener los pokemones de la API usando el endpoint del id

const getPokemonsApi = async () => {

    const pokemonsPromises = [];

    for (let id = 1; id <= 151; id++) {
        const promise =  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        pokemonsPromises.push(promise);
    }

    const responses = await Promise.all(pokemonsPromises);

    const pokemonList = responses.map((pokemonData) => {
        const pokemonDato = pokemonData.data
        return {
            id: pokemonDato.id,
            name: pokemonDato.name,
            image: pokemonDato.sprites.other.dream_world.front_default,
            hp: pokemonDato.stats[0].base_stat,
            attack: pokemonDato.stats[1].base_stat,
            defense: pokemonDato.stats[2].base_stat,
            speed: pokemonDato.stats[5].base_stat,
            height: pokemonDato.height,
            weight: pokemonDato.weight,
            types: pokemonDato.types.map(type => type.type.name),
        }
    });
    return pokemonList
}

// Obtención de los pokemones creados en la Data base

const getPokemonsDb = async () => {
    const dataBasePokemons = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
    let dataBasePokemons2 = dataBasePokemons.map(pokemon => {
        let mapedTypes = pokemon.types.map(type => type.name)
        return { ...pokemon.toJSON(), types: mapedTypes }
    })
    return dataBasePokemons2
};

// Concatenación de los pokemones traidos de la base de datos, con los de la traidos de la Api

const getAllPokemons = async () => {


    const apiInfo = await getPokemonsApi();
    const dbInfo = await getPokemonsDb();
    const totalData = [...apiInfo, ...dbInfo];
    return totalData;
};


//Crear nuevo pokemón

const postPokemon = async (name, hp, attack, defense, speed, height, weight, image, types) => {

    if (!name || !hp || !attack || !defense || !image || !types) {
        throw new Error("Se requieren todos los datos obligatorios")
    } else {
        const createPokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image,
        });

        const typeDB = await Type.findAll({
            where: { name: types },
        });

        await createPokemon.addType(typeDB);

        return 'se creó correctamente el pokemon';
    }
}


// Obtener un pokemon por nombre ya sea de la API o de la data base

const getPokemonByNameApi = async (name) => {
    try {
        const result = await axios(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const pokemonDato = result.data;
        const pokemonByName = {
            id: pokemonDato.id,
            name: pokemonDato.name,
            image: pokemonDato.sprites.other.dream_world.front_default,
            hp: pokemonDato.stats[0].base_stat,
            attack: pokemonDato.stats[1].base_stat,
            defense: pokemonDato.stats[2].base_stat,
            speed: pokemonDato.stats[5].base_stat,
            height: pokemonDato.height,
            weight: pokemonDato.weight,
            types: pokemonDato.types.map(type => type.type.name),
        };
        return pokemonByName;
    } catch (error) {
        console.error(error);
        throw new Error(`No se encontró ningún Pokémon con el nombre '${name}'`);
    }
};

const getPokemonByNameDb = async (name) => {
    try {
        const pokemon = await Pokemon.findOne({
            where: { name: name.toLowerCase() },
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });
        if (!pokemon) {
            throw new Error(`No se encontró ningún Pokémon con el nombre '${name}'`);
        }
        let mapedTypes = pokemon.types.map(type => type.name);
        const pokemonId2 = { ...pokemon.toJSON(), types: mapedTypes };
        return pokemonId2;
    } catch (error) {
        throw new Error(`Error en la base de datos: ${error.message}`);
    }
};

const getPokemonByName = async (name) => {
    try {
        const pokemonNameDb = await getPokemonByNameDb(name);
        return pokemonNameDb;
    } catch (error) {
        const pokemonNameApi = await getPokemonByNameApi(name);
        return pokemonNameApi;
    }
};



//Obtener detalles del pokemon usando el endpoind de ID directamente

const detailsById = async (id) => {
    if (id) {

        if (id.length > 5) {
            const pokemonId = await Pokemon.findByPk(id, {
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    },
                }
            });
            let mapedTypes = pokemonId.types.map(type => type.name)
            const pokemonId2 = { ...pokemonId.toJSON(), types: mapedTypes }
            return pokemonId2
        }
        else {
            const response = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const pokemonDato = response.data;
            const pokemonById = {
                id: pokemonDato.id,
                name: pokemonDato.name,
                image: pokemonDato.sprites.other.dream_world.front_default,
                hp: pokemonDato.stats[0].base_stat,
                attack: pokemonDato.stats[1].base_stat,
                defense: pokemonDato.stats[2].base_stat,
                speed: pokemonDato.stats[5].base_stat,
                height: pokemonDato.height,
                weight: pokemonDato.weight,
                types: pokemonDato.types.map(type => type.type.name),
            }
            return pokemonById
        }
    }
}

module.exports = {
    getAllPokemons,
    postPokemon,
    detailsById,
    getPokemonByName,
    getPokemonByNameDb
}