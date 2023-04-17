import React from 'react';
import style from '../styles/paginado.module.css'

const PaginadoPrueba = ({ pokemonsPerPage, allPokemons, paginado, currentPage, indexFirstPokemon, currentPokemons }) => {

    const MaxPageNumbers = 5;
    const pageNumber = [];
    const totalPages = Math.ceil(allPokemons / pokemonsPerPage);

    let startPage = 1;
    if (totalPages > MaxPageNumbers) {
      if (currentPage > MaxPageNumbers - 2) {
        startPage = currentPage - 2;
        if (currentPage > totalPages - MaxPageNumbers + 2) {
          startPage = totalPages - MaxPageNumbers + 1;
        }
      }
    }
    for (let i = startPage; i <= Math.min(totalPages, startPage + MaxPageNumbers - 1); i++) {
      pageNumber.push(i);
    }

    const renderPageNumbers = () => {
        let pageButtons = [];
        if (totalPages > 1) {
          pageButtons.push(
            <button
              key="previous"
              disabled={currentPage === 1}
              onClick={() => paginado(currentPage - 1)}
            >
              &lt;
            </button>
          );
          for (let i = 0; i < pageNumber.length; i++) {
            const number = pageNumber[i];
            const isActive = currentPage === number;
            pageButtons.push(
              <button
                key={number}
                className={isActive ? style.active : style.noActive}
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            );
          }
           pageButtons.push(
            <button
              key="next"
              disabled={currentPage === totalPages}
              onClick={() => paginado(currentPage + 1)}
            >
              &gt;
            </button>
          );
        }
        return pageButtons;
      };

    return (
        <div>
            <div className={style.pagination}>{renderPageNumbers()}</div> 
            {allPokemons ? <span className={style.showing}>mostrando {indexFirstPokemon + 1} - {indexFirstPokemon + currentPokemons.length} de {allPokemons} pokemons</span> : <h2>No se encontró ningún Pokemon</h2>}
        </div>
    );
}

export default PaginadoPrueba;
