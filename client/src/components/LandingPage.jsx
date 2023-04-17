import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import style from '../styles/landing.module.css'
import logoP from '../images/pokemon-go-removebg-preview.png'
import { getPokemons, getTypes } from '../redux/actions/actions';


const LandingPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async (event) => {
        event.preventDefault();
        dispatch(getPokemons());
        dispatch(getTypes());
        navigate('/home')
    }

    return (
        <div className={style.container}>
            <img src={logoP} alt=''></img>
            <h1>Bienvenido a PokeAPi</h1>
            <button onClick={handleClick}>Go Home</button>
        </div>
    );
}

export default LandingPage;
