import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {counterReducer} from "../../store/reducers/counterReducer";
import MyButton from "../button/MyButton";
import styles from "./Counter.module.css"

const Counter = () => {
    const dispatch = useDispatch();
    const {counter} = useSelector(state => state.counterReducer)

    const increase = () => {
        dispatch(counterReducer.actions.INCREASE_COUNTER(20))
    }
    const decrease = () => {
        dispatch(counterReducer.actions.DECREASE_COUNTER(20))
    }
    return (
        <div className={styles.counter_body}>
            <h2>Counter: {counter}</h2>
            <br/>
            <MyButton onClick={increase}>Increase counter</MyButton>
            <MyButton onClick={decrease}>Decrease counter</MyButton>
        </div>
    );
};

export default Counter;