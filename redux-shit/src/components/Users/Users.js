import React from 'react';
import {fetchUsers} from "../../store/actions/users";
import {counterReducer} from "../../store/reducers/counterReducer";
import {useDispatch, useSelector} from "react-redux";
import MyButton from "../button/MyButton";
import styles from "./Users.module.css"

const Users = () => {
    const dispatch = useDispatch();
    const { isLoading, users, errors} = useSelector(state => state.counterReducer)

    const getRandomSurname = () => {
        const surnames = [
            'Nadvornuy',
            'Shevchenko',
            'Soin',
            'Osmirko',
            'Kutsko',
            'Garkaviy',
            'Papirnuy',
            'Kuzmenko',
            'Savitskiy',
            'Malyavkin',
        ]
        return surnames[Math.floor(Math.random()*10)]
    }
    const addUserHandler = () => {
        const user = {
            name: `Petya ${getRandomSurname()}`,
            id: Date.now()
        }
        dispatch(counterReducer.actions.ADD_USER(user))
    }

    const removeUserHandler = (id) => {
        dispatch(counterReducer.actions.REMOVE_USER(id));
    }

    const checkRepeatIds = () => {

    }
    return (
        <div className={styles.users_container}>
            <MyButton onClick={addUserHandler}>Add user</MyButton>
            <MyButton onClick={() => dispatch(fetchUsers())}>Add users from fakeAPI</MyButton>

            {isLoading ? <p>Загрузка...</p> : (
                users.length ?
                        <div>
                            <p>Users:</p>
                            {users.map((user, index) =>
                                <div key={index} id={user.id} onClick={() => removeUserHandler(user.id)}>{user.name}</div>)}
                        </div>
                        :
                    <div>{errors ?? "Нікого немає вдома"}</div>

            )}

        </div>
    );
};

export default Users;