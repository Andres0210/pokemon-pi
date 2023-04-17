import React from 'react';
import { useSelector } from 'react-redux';
import style from '../styles/filters.module.css';


const Filtros = ({ handleFilterType, handleOriginFilter, handleSortPokemons }) => {

    let filter = useSelector(state => state.filterValues)

    return (
        <div className={style.container}>
            <h5 className={style.title}>FILTRAR</h5>
            <div className={style.filtersContainer}>
                <div >
                    <h5>Por tipo: </h5>
                    <select className={style.selects} value={filter.types} onChange={handleFilterType}>
                        <option value="all">Todos</option>
                        <option value="normal">Normal</option>
                        <option value="fighting">Fighting</option>
                        <option value="poison">Poison</option>
                        <option value="flying">Flying</option>
                        <option value="rock">Rock</option>
                        <option value="ground">Ground</option>
                        <option value="steel">Steel</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="bug">Bug</option>
                        <option value="ghost">Ghost</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="psychic">Psychic</option>
                        <option value="ice">Ice</option>
                        <option value="dark">Dark</option>
                        <option value="dragon">Dragon</option>
                        <option value="fairy">Fairy</option>
                        <option value="unknown">Unknown</option>
                        <option value="shadow">Shadow</option>
                    </select>
                </div>
                <div>
                    <h5>Creado: </h5>
                    <select className={style.selects} value={filter.origin} onChange={handleOriginFilter}>
                        <option value='all'>Todos</option>
                        <option value='created'>Creados</option>
                        <option value='api'>Api</option>
                    </select>
                </div>
                <div>
                    <h5>ORDENAR</h5>
                    <select className={style.selects} value={filter.order} onChange={handleSortPokemons} >
                        <option disabled value='order'>Ordenar</option>
                        <option value='ascendente'>A-Z</option>
                        <option value='descendente'>Z-A</option>
                        <option value='more-attack'>Mayor ataque</option>
                        <option value='less-attack'>Menor ataque</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Filtros;
