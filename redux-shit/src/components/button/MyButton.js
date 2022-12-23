import React from 'react';
import styles from "./MyButton.module.css"
const MyButton = (props) => {
    return (
        <button onClick={props.onClick} className={styles.btn}>
            {props.children}
        </button>
    );
};

export default MyButton;