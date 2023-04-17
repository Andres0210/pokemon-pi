const { Router } = require('express');
const { Pokemon, Type } = require('../db')
const { getAllPokemons, postPokemon, detailsById, getPokemonByName, getPokemonByNameDb } = require('../controllers/pokemonsControllers')
const getAllTypes = require('../controllers/getTypesDb')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers

router.get('/pokemons', async (req, res) => {
    const name = req.query.name;

    try {
        if (name) {
            let response = await getPokemonByName(name);
            res.status(200).json([response]);
        }
        else {
            let response = await getAllPokemons();
            res.status(200).json(response)
        }

    } catch (error) {
        return res.status(400).send(error.message)
    }
});

router.get('/types', async (req, res) => {
    try {
        const typesApi = await getAllTypes();
        res.status(200).json(typesApi)
    } catch (error) {
        return res.status(404).send(error.message)
    }
});

router.post("/pokemons", async (req, res) => {
    try {
        const { name, hp, attack, defense, speed, height, weight, image, types } =
            req.body;
        const createPokemon = await postPokemon(name, hp, attack, defense, speed, height, weight, image, types);
        res.status(200).send(createPokemon);
    } catch (error) {
        res.status(404).send(error.message)
    }
});

router.get('/pokemons/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await detailsById(id);
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message);
    }
})
module.exports = router;
