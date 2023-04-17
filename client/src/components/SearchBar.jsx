import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../redux/actions/actions';
import style from '../styles/navBar.module.css'
import loadingGift from '../images/charmander-loading-unscreen.gif'

const SearchBar = () => {

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  const handleInput = (event) => {
    setName(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name) {
      window.alert('ingrese el nombre que desea buscar')
    } else {
      setLoading(true);
      try {
        await dispatch(getPokemonByName(name))
      } catch (error) {
        window.alert(error);
      } finally {
        setLoading(false)
        setName('')
      }

    }

  }
  return (
    <div className={style.searchContainer}>
      {loading && <img src={loadingGift} alt='loading...' className={style.loading} />}
      <input value={name} type='text' placeholder='ingrese nombre' onChange={handleInput} />
      <button onClick={(e) => handleSubmit(e)}>Buscar</button>
    </div>
  );
}

export default SearchBar;
