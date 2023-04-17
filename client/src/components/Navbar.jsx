import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import style from '../styles/navBar.module.css'
import logo from '../images/pokemon-go-removebg-preview.png'



const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <div className={style.logoContainer}>
                <img src={logo} alt='logo' className={style.logo}></img>
                <Link to='/create'><button className={style.newPokemonButton}>Crear Personaje</button></Link>
            </div>
            <SearchBar></SearchBar>
        </nav>

    );
}

export default Navbar;
