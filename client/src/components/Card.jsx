import React from 'react';
import style from '../styles/card.module.css'

const Card = ({ name, image, types, attack, speed }) => {
    return (
        <div className={style.card}>
        
            <h3>{name}</h3>
            <div className={style.content}>
             <div className={style.imgC}>   <img className={style.img} src={image} alt='' /></div>
                <div className={style.attack}>
                    <h5>Ataque:</h5>
                    <span className={style.ataque}>{attack}</span>
                  
                </div>
            </div>
            <div className={style.typeContainer}>
                {types?.map((type, index) => {
                    return <h5 key={index}>{type} </h5>
                })}
            </div>
        </div>
    );
}

export default Card;
