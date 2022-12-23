import React from 'react';
import styles from "./ProductItem.module.css"
const ProductItem = (props) => {

    return (
        <div className={styles.card}>
            <div className={styles.imgFrame}>
                <img className={styles.img} src={props.image} alt=""/>
            </div>
            <p className={styles.title}>{props.title}</p>
            <p className={styles.price}>{props.price ?? "Не визначена ціна "}$</p>
            <button onClick={props.onClick} className={styles.btn}>Переглянути товар</button>
        </div>
    );
};

export default ProductItem;