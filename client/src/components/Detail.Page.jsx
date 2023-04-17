import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from '../styles/detalle.module.css'
import BarraProgreso from './barraProgreso';
import axios from 'axios';


const DetailPage = () => {


  const [detalle, setDetalle] = useState({});
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {

    const getDetail = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3001/pokemons/${id}`);
        setDetalle(response.data)

      } catch (error) {
        console.log(error);
      }

    }
    getDetail(id);

    return setDetalle({})
  }, [id])

  return (
    <div className={style.principal}>
      <button className={style.homeButton} onClick={() => { navigate('/home') }}>HOME</button>
      <div className={style.detailContainer}>
        <div className={style.nameContainer}>
          <div className={style.id}><h3># {detalle.id}</h3></div>
          <div className={style.name}><h3 >{detalle.name}</h3></div>
        </div>
        <div className={style.imageTypes}>
          <div className={style.imageContainer}>
            <img src={detalle.image} alt='' />
          </div>
          <div className={style.typesContainer}>

            {detalle.types?.map((type, index) => {
              return <h5 key={index}>{type} </h5>
            })}
          </div>
        </div>
        <div className={style.skillsContainer}>
          <div className={style.pointsContainer}>
            {detalle.hp && <BarraProgreso detalle={detalle} titulo="Vida" valor={detalle.hp} />}
            {detalle.attack && <BarraProgreso detalle={detalle} titulo="Ataque" valor={detalle.attack} />}
            {detalle.defense && <BarraProgreso detalle={detalle} titulo="Defensa" valor={detalle.defense} />}
            {detalle.speed && <BarraProgreso detalle={detalle} titulo="Velocidad" valor={detalle.speed} />}
          </div>
          <div className={style.weightHeight}>
            <div className={style.height}>
              <h5>Altura (in.): <span>{detalle.height}</span></h5>
            </div>
            <div className={style.weight}>
              <h5>peso(Kg):<span>{detalle.weight}</span></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
