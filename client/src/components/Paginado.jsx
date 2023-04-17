import React from 'react';
import style from '../styles/paginado.module.css'

const Paginado = ({ pokemonsPerPage, allPokemons, paginado, currentPage, indexFirstPokemon, currentPokemons }) => {

    const pageNumber = [];
    const limit = Math.ceil(allPokemons / pokemonsPerPage);
    for (let i = 1; i <= limit; i++) {
        pageNumber.push(i)
    }
    const renderPageNumber = pageNumber?.map(number => {
        const isActive = currentPage === number;
        return (

            <button
                key={number}
                className={isActive ? style.active : style.noActive}
                onClick={() => paginado(number)}
            >{number}</button>

        )
    })
    return (
        <div>
            <ul>
                <div>
                    <div className={style.pagination}>{renderPageNumber}</div>
                    {allPokemons ? <span className={style.showing}>mostrando {indexFirstPokemon + 1} - {indexFirstPokemon + currentPokemons.length} de {allPokemons} pokemons</span> : <h2>No se encontró ningún Pokemon</h2>}
                </div>
            </ul>
        </div>
    );
}

export default Paginado;
