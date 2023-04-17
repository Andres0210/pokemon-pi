import React, { useState } from 'react';
import axios from 'axios';
import style from '../styles/formulario.module.css'
import validator from '../utils/validator';
import ash from '../images/ash_k.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Formulario = () => {

    const types = useSelector(state => state.types)

    const [newPokemon, setNewPokemon] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        types: [],
    });

    const [errors, setErrors] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
    });

    const navigate = useNavigate();


    const handleCheckBoxChange = (event) => {

        const { name, checked } = event.target;
        if (checked) {
            setNewPokemon({ ...newPokemon, types: [...newPokemon.types, name] });
        }
        else {
            setNewPokemon({ ...newPokemon, types: newPokemon.types.filter((n) => n !== name) });
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPokemon({
            ...newPokemon,
            [name]: value
        })
        setErrors(validator({
            ...newPokemon,
            [name]: value
        }))


    }

    const handleSubmit = (event) => {

        const { name, value } = event.target;
        setErrors(validator({
            ...newPokemon,
            [name]: value
        }))
        if (errors.name ||
            errors.hp ||
            errors.attack ||
            errors.defense ||
            errors.speed ||
            errors.height ||
            errors.weight ||
            errors.image
        ) {
            event.preventDefault();
            window.alert('Debe completar todos los campos de forma correcta')
        }
        else if (newPokemon.types.length > 2 || newPokemon.types.length === 0) {
            event.preventDefault();
            window.alert('debe escoger uno o dos tipos')
        }

        else {
            event.preventDefault();
            axios.post('/pokemons', newPokemon)
                .then(response => {
                    window.alert(response.data)
                })
            setNewPokemon({
                name: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                height: '',
                weight: '',
                image: '',
            })

            setTimeout(goBack, 2000);
        }


    }

    const renderTypes = types.map((type, index) => {

        return (
            <div className={style.boxContainer} key={type}>
                <label htmlFor={index}>{type}</label>
                <input
                    type='checkbox'
                    name={type}
                    id={index}
                    onChange={(e) => handleCheckBoxChange(e)} />


            </div>
        )
    })

    const goBack = () => {
        navigate('/home')
    }


    return (
        <div className={style.container}>
            <button onClick={goBack} className={style.backButton}>Volver</button>
            <form onSubmit={handleSubmit} className={style.form}>
                <h1>CREA TU POKEMON</h1>
                <div className={style.inputsAndAsh}>
                    <div className={style.allInputs}>
                        <div className={style.inputContainer}>
                            <label htmlFor='name'> Nombre: (*) </label>
                            <input
                                className={style.input}
                                type='text'
                                name='name'
                                value={newPokemon.name}
                                onChange={handleInputChange}
                                placeholder='ingrese nombre...' />
                            {errors.name ? <span>{errors.name}</span> : null}
                        </div>

                        <div className={style.inputContainer}>
                            <label htmlFor='hp'>Vida: (*) </label>
                            <input
                                className={style.input}
                                type='text'
                                name='hp'
                                value={newPokemon.hp}
                                onChange={handleInputChange}
                                placeholder='ingrese vida (máx 150)...' />
                            {errors.hp ? <span>{errors.hp}</span> : null}
                        </div>

                        <div className={style.inputContainer}>
                            <label htmlFor='attack'>Ataque: (*) </label>
                            <input
                                className={style.input}
                                type='text'
                                name='attack'
                                value={newPokemon.attack}
                                onChange={handleInputChange}
                                placeholder='ingrese ataque (máx. 150)...' />
                            {errors.attack ? <span>{errors.attack}</span> : null}
                        </div>

                        <div className={style.inputContainer}>
                            <label htmlFor='defense'>Defensa: (*) </label>
                            <input
                                className={style.input}
                                type='text'
                                name='defense'
                                value={newPokemon.defense}
                                onChange={handleInputChange}
                                placeholder='ingrese defensa (máx. 150)...' />
                            {errors.defense ? <span>{errors.defense}</span> : null}
                        </div>

                        <div className={style.inputContainer}>
                            <label htmlFor='speed'>Velocidad: </label>
                            <input
                                className={style.input}
                                type='text'
                                name='speed'
                                value={newPokemon.speed}
                                onChange={handleInputChange}
                                placeholder='ingrese velocidad (máx. 150)...' />
                            {errors.speed ? <span>{errors.speed}</span> : null}
                        </div>

                        <div className={style.inputContainer}>
                            <label htmlFor='weight'>Peso: </label>
                            <input
                                className={style.input}
                                type='text'
                                name='weight'
                                value={newPokemon.weight}
                                onChange={handleInputChange}
                                placeholder='ingrese el peso...' />
                            {errors.weight ? <span>{errors.weight}</span> : null}
                        </div>

                        <div className={style.inputContainer}>
                            <label htmlFor='height'>Altura: </label>
                            <input
                                className={style.input}
                                type='text'
                                name='height'
                                value={newPokemon.height}
                                onChange={handleInputChange}
                                placeholder='ingrese la altura...' />
                            {errors.height ? <span>{errors.height}</span> : null}
                        </div>

                        <div className={style.inputContainer}>
                            <label htmlFor='image'>Imagen: (*)</label>
                            <input
                                className={style.input}
                                type='text'
                                name='image'
                                value={newPokemon.image}
                                onChange={handleInputChange}
                                placeholder='ingrese url de imagen...' />
                            {errors.image ? <span>{errors.image}</span> : null}
                        </div>
                    </div>
                    <div className={style.imageAsh}><img src={ash} alt='imagen' /></div>
                </div>
                <h5>Selecciona 2 tipos para tu Pokemon</h5>
                <div className={style.allBoxes}>{renderTypes}</div>

                <button type='submit'>Crear pokemon</button>
            </form>

        </div>
    );


}

export default Formulario;
