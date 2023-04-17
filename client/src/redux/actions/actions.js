import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_ORIGIN = 'FILTER_ORIGIN';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_BY_NAME = 'GET_BY_NAME';
export const GET_DETAIL = 'GET_DETAIL';
export const POKEMONS_ERROR = 'POKEMONS_ERROR';
export const GET_TYPES = 'GET_TYPES';

export const getPokemons = () => {
    return async function (dispatch) {

        let response = await axios.get("http://localhost:3001/pokemons", {});
        console.log(response.data);
        return dispatch({
            type: GET_POKEMONS,
            payload: response.data
        })

    }
}

export function getTypes() {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/types');
        const tipes = await response.data?.map(type => {
            return type.name;
        });
        return dispatch({
            type: GET_TYPES,
            payload: tipes
        })
    }

}

export const filterPokemonsByType = (payload) => {
    console.log(payload);
    return {
        type: FILTER_BY_TYPE,
        payload
    }
}


export const filterOrigin = (payload) => {
    return {
        type: FILTER_ORIGIN,
        payload
    }
}

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export const getPokemonByName = (name) => {
    return async function (dispatch) {
        try {
            const pokemonByName = await axios(`http://localhost:3001/pokemons/?name=${name}`);
            if (pokemonByName.status === 200) {
                console.log(pokemonByName);
                return dispatch({
                    type: GET_BY_NAME,
                    payload: pokemonByName.data
                })
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }
}

export const setFilters = () => {
    return {
        type: 'SET_FILTERS'
    }
}