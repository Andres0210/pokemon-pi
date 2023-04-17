import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterOrigin, filterPokemonsByType, getPokemons, orderByName, setFilters } from '../redux/actions/actions';
import Card from './Card';
import Navbar from './Navbar';
import style from '../styles/home.module.css'
import Filtros from './filtros';
import { Link } from 'react-router-dom';
import Paginado from './Paginado';
import PaginadoPrueba from './paginadoPrueba copy';


const HomePage = () => {

    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons);

    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;
    const indexlastPokemon = currentPage * pokemonsPerPage;
    const indexFirstPokemon = indexlastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexFirstPokemon, indexlastPokemon)
    const [order, setOrder] = useState(false);

    const paginado = (pagenumber) => {  // Función que establece la página actual en el valor que se le indique
        setCurrentPage(pagenumber)
    }

    const handleClick = async () => { // Función para recargar la página al presionar el botón reload
        await dispatch(getPokemons());
        setCurrentPage(1);
    }

    const handleFilterType = (event) => {  // Función para realizar filtrado por tipos
        setCurrentPage(1)
        dispatch(filterPokemonsByType(event.target.value))
        setOrder(!order)
    }

    const handleOriginFilter = (event) => {  // Función para filtrar por API o Base de Datos
        setCurrentPage(1)
        dispatch(filterOrigin(event.target.value))
    }

    const handleSortPokemons = (event) => {  // Función para ordenar los pokemons
        dispatch(orderByName(event.target.value));
        setCurrentPage(1);
        setOrder(!order)
    }

    return (
        <div className={style.container}>

            <Navbar></Navbar>
            <div className={style.bodyCont}>

                <div className={style.filters}>
                    <Filtros
                        handleFilterType={handleFilterType}
                        handleOriginFilter={handleOriginFilter}
                        handleSortPokemons={handleSortPokemons}
                    />
                </div>
                <div className={style.cardPag}>
                    <button className={style.reload} onClick={handleClick}>Reload</button>
                    <div className={style.cards}>
                        {currentPokemons?.map((pok, index) => {
                            return (
                                <Link className={style.link} key={index} to={`/pokemon/${pok.id}`}>
                                    <Card
                                        key={index}
                                        name={pok.name}
                                        image={pok.image}
                                        types={pok.types}
                                        attack={pok.attack}
                                        speed={pok.speed}
                                    ></Card>
                                </Link>
                            )
                        })
                        }
                    </div>

                    <PaginadoPrueba
                        paginado={paginado}
                        pokemonsPerPage={pokemonsPerPage}
                        allPokemons={allPokemons.length}
                        currentPage={currentPage}
                        indexFirstPokemon={indexFirstPokemon}
                        indexlastPokemon={indexlastPokemon}
                        currentPokemons={currentPokemons}
                    />
                </div>

            </div>
        </div>
    );
}

export default HomePage;
