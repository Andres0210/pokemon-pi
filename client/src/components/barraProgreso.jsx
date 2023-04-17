import React from 'react';
import style from '../styles/detalle.module.css'

const BarraProgreso = (props) => {

    const porcentaje = 1.49019608 * props.valor

    return (
        <div className={style.barra}>
            <div className={style.titleContainer}>
                <h5>{props.titulo}:
                    <span className={style.valor}>{props.valor}</span>
                </h5>
            </div>
            <div className={style.backBarra}>
                <div className={style.barraProgreso} style={{ width: porcentaje }}></div>
            </div>
        </div>
    );
}

export default BarraProgreso;
