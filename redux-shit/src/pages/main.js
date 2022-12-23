import {useSelector} from "react-redux";
import React from "react";
import Counter from "../components/Counter/Counter";
import Users from "../components/Users/Users";
import styles from "./main.module.css"

const Main = () => {
    const topic = useSelector(state => state.counterReducer.lesson.topic);

    return (
        <div className={styles.content}>
            <h2>Lesson: {topic}</h2>
            <Counter/>
            <h3>Work with users</h3>
            <Users/>
        </div>
    )
}
export {Main}