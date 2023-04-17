import { FILTER_BY_TYPE, FILTER_ORIGIN, GET_BY_NAME, GET_POKEMONS, GET_TYPES, ORDER_BY_NAME, POKEMONS_ERROR } from "../actions/actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    filteredType: [],
    types: [],
    filterValues: {
        types: 'all',
        origin: 'all',
        order: 'order'
    }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:

            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
                filteredType: action.payload
            }
        case FILTER_BY_TYPE:
            const allPokemons = state.allPokemons
            const typeFiltered = action.payload === 'all' ? allPokemons
                : allPokemons.filter(pokemon => pokemon.types.find(type => type === action.payload))
            return {
                ...state,
                pokemons: typeFiltered,
                filteredType: typeFiltered,
                filterValues: {  types: action.payload, origin: 'all', order: 'order'  },
            }
        case FILTER_ORIGIN:
            const pokemons = state.filteredType;
            const originFiltered = action.payload === 'created' ? pokemons.filter(pokemon => pokemon.createdInDb)
                : pokemons.filter(pokemon => !pokemon.createdInDb);
            return {
                ...state,
                pokemons: action.payload === 'all' ? pokemons : originFiltered,
                filterValues: { ...state.filterValues, origin: action.payload, order: 'order' }
            }
        case ORDER_BY_NAME:
            let sortedPokemons = [];

            if (action.payload === 'ascendente') {

                sortedPokemons = state.pokemons.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0
                })
            }

            else if (action.payload === 'descendente') {
                sortedPokemons = state.pokemons.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0
                })
            }
            else if (action.payload === 'less-attack') {
                sortedPokemons = state.pokemons.sort((a, b) => {
                    if (a.attack > b.attack) {
                        return 1;
                    }
                    if (b.attack > a.attack) {
                        return -1;
                    }
                    return 0
                })
            } else {
                sortedPokemons = state.pokemons.sort((a, b) => {
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    if (b.attack > a.attack) {
                        return 1;
                    }
                    return 0
                })
            }
            return {
                ...state,
                pokemons: sortedPokemons,
                filterValues: { ...state.filterValues, order: action.payload }
            }
        case GET_BY_NAME:

            return {
                ...state,
                pokemons: action.payload

            }
        
        case GET_TYPES:
            return {
                ...state,
                types: action.payload

            }
       
        default:
            return { ...state }
    }
}

export default rootReducer;