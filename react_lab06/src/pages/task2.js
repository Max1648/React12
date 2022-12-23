import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

const Task2 = () => {

    const schema = yup.object().shape({
        'SenderCity': yup.string().required(),
        'RecipientCity': yup.string().required(),
        'TypeOfShipment': yup.string().required(),
    })
    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm({
        resolver: yupResolver(schema)
    })
    const [withPackage, setwithPackage] = useState(false)
    const [returnShip, setReturnShip] = useState(false)
    const [count, setCount] = useState([1,1])
    const initialArray = [
        {
            id: 0,
            element: (
                <tr className={"border-top-0 border-bottom-0 border border-3"}>
                    <td className={"d-flex"}>
                        <label>
                            Кількість
                            <input
                                min={1}
                                onInput={e => {
                                    if (Number(e.currentTarget.value) < 1){
                                        e.currentTarget.value = "1"
                                        return
                                    }
                                    setCount([Number(e.currentTarget.value), count[1]])
                                }}
                                defaultValue={1} required {...register("places.place1.count")} className={"form-control"} type="number"/>
                        </label>
                    </td>
                    <td>
                        <label>
                            Оголошена вартість
                            <input required {...register("places.place1.price")} placeholder={"в гривнях"}
                                   className={"form-control"}
                                   type="number"/>
                        </label>
                    </td>
                    <td>
                        <label>
                            Вага
                            <input required {...register("places.place1.weight")} placeholder={"в кілограмах"}
                                   className={"form-control"} type="number"/>
                        </label>
                    </td>
                    <td className={"d-flex ms-5"}>
                        <label>
                            Довжина
                            <input required {...register("places.place1.length")} placeholder={"в сантиметрах"}
                                   className={"form-control"} type="number"/>
                        </label>
                    </td>
                    <td>
                        <label>
                            Ширина
                            <input required {...register("places.place1.height")} placeholder={"в сантиметрах"}
                                   className={"form-control"} type="number"/>
                        </label>
                    </td>
                    <td>
                        <label>
                            Висота
                            <input required {...register("places.place1.width")} placeholder={"в сантиметрах"}
                                   className={"form-control"} type="number"/>
                        </label>
                    </td>
                </tr>
            ),
        }

    ]
    const [places, setPlaces] = useState(initialArray)
    const submitHandler = (data) => {
        console.group("Результат");
        console.group("Маршрут");
        console.log(data.SenderCity)
        console.log(data.RecipientCity)
        console.groupEnd()
        console.group("Вид відправлення")
        console.log(data.TypeOfShipment)
        console.groupEnd()
        console.group("Характеристика місць");
        for (let i = 0; i < places.length; i++) {
            console.group(`Місце ${i+1}`)
            console.log("Count:" + data.places[`place${i+1}`].count)
            console.log("Price:" + data.places[`place${i+1}`].price)
            console.log("Weight:" + data.places[`place${i+1}`].weight)
            console.log("Length:" + data.places[`place${i+1}`].length)
            console.log("Width:" + data.places[`place${i+1}`].width)
            console.log("Height:" + data.places[`place${i+1}`].height)
            console.groupEnd()
        }
        console.groupEnd()
        console.group("Послугі")
        console.log(`Пакування - ${data.Packaging}`)
        if (data.Packaging)
            places.forEach((item,index) => {
                console.log(data.packages[`package${index+1}`].packageType)
            })
        console.log(`Кількість поверхів - ${data.CountOfFloors !== "" ? data.CountOfFloors : 0}`)
        console.log(`Ліфт - ${data.lift}`)
        console.log(`Зворотна доставка - ${data.ReturnShipping}`)
        if (data.ReturnShipping)
            console.log(data.TypeOfReturnShiping)
        console.groupEnd()
        console.groupEnd()
        console.log()
    }
    const addPlaceHandler = e => {
        if (places.length > 1)
            return
        let id = places.length + 1
        setPlaces(prevState => [...prevState, {
            id: id, element: (
                <tr key={id} className={"border-top-0 border-bottom-0 border border-3"}>
                    <td className={"d-flex"}>
                        <label>
                            Кількість
                            <input min={1} onInput={e => {
                                if (Number(e.currentTarget.value) < 1){
                                    e.currentTarget.value = "1"
                                    return
                                }
                                setCount([count[0], Number(e.currentTarget.value)])
                            } } defaultValue={1} required {...register(`places.place${id}.count`)} className={"form-control"} type="number"/>
                        </label>
                    </td>
                    <td>
                        <label>
                            Оголошена вартість
                            <input required {...register(`places.place${id}.price`)} placeholder={"в гривнях"}
                                   className={"form-control"}
                                   type="number"/>
                        </label>
                    </td>
                    <td>
                        <label>
                            Вага
                            <input required {...register(`places.place${id}.weight`)} placeholder={"в кілограмах"}
                                   className={"form-control"} type="number"/>
                        </label>
                    </td>
                    <td className={"d-flex ms-5"}>
                        <label>
                            Довжина
                            <input required {...register(`places.place${id}.length`)} placeholder={"в сантиметрах"}
                                   className={"form-control"} type="number"/>
                        </label>
                    </td>
                    <td>
                        <label>
                            Ширина
                            <input required {...register(`places.place${id}.height`)} placeholder={"в сантиметрах"}
                                   className={"form-control"} type="number"/>
                        </label>
                    </td>
                    <td>
                        <label>
                            Висота
                            <input required {...register(`places.place${id}.width`)} placeholder={"в сантиметрах"}
                                   className={"form-control"} type="number"/>
                        </label>
                    </td>
                    <td>
                        <button onClick={removePlace} className={'btn btn-danger mt-4'}>X</button>
                    </td>
                </tr>
            )
        }])
    }
    const removePlace = e => {
        const index = places.findIndex((item) => item.id === e.target.parentNode.parentNode.id);
        setPlaces([...places.filter(item => item.id !== index)])
    }
    const showPackageHandler = e => {
        let parentTr = e.target.parentNode.parentNode
        parentTr.nextSibling.classList.toggle("d-none")
        setwithPackage(!withPackage)
    }
    const showReturnShipHandler = e => {
        let parentTr = e.target.parentNode.parentNode
        parentTr.nextSibling.classList.toggle("d-none")
        setReturnShip(!returnShip)
    }
    return (
        <div className={"p-4 shadow-lg rounded w-75 "}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <table cellPadding={"10px"}>
                    <tbody>
                    <tr className={"border border-3"}>
                        <td colSpan={3}>{errors.SenderCity || errors.RecipientCity ? <p className={'text-danger mx-2 d-inline'}>X</p> : ""}Маршрут</td>
                        <td>
                            <label>
                                Місто-відправник
                                <select
                                    {...register("SenderCity")}
                                    className={"form-select form-select-sm"}>
                                    <option value=""></option>
                                    <option value="Zhytomyr">Житомир</option>
                                    <option value="Vinitsa">Віниця</option>
                                    <option value="Kyiv">Київ</option>
                                    <option value="Lviv">Львів</option>
                                    <option value="Rivne">Рівне</option>
                                    <option value="Kharkiv">Харків</option>
                                </select>
                            </label>
                        </td>
                        <td>
                            <label className={"ms-4"}>
                                Місто-отримувач
                                <select
                                    {...register("RecipientCity")}
                                    className={"form-select form-select-sm"}>
                                    <option value=""></option>
                                    <option value="Zhytomyr">Житомир</option>
                                    <option value="Vinitsa">Віниця</option>
                                    <option value="Kyiv">Київ</option>
                                    <option value="Lviv">Львів</option>
                                    <option value="Rivne">Рівне</option>
                                    <option value="Kharkiv">Харків</option>
                                </select>
                            </label>
                        </td>
                    </tr>
                    <tr className={"border border-3"}>
                        <td colSpan={3}>{errors.TypeOfShipment ? <p className={'text-danger mx-2 d-inline'}>X</p> : ""}Вид відправлення</td>
                        <td>
                            <label className={""}>
                                <select
                                    {...register("TypeOfShipment")}
                                    className={"form-select form-select-sm"}>
                                    <option value="Shipment">Вантажі</option>
                                    <option value="Pallets">Палети</option>
                                </select>
                            </label>
                        </td>
                    </tr>
                    <tr className={"border border-3 border-bottom-0"}>
                        <td>Характеристика місць</td>
                    </tr>
                    {places.map(item => (
                        <>
                            {item.element}
                        </>
                    ))}
                    <tr className={"border-top-0  border-3 border"}>
                        <td>
                            <button type={"button"} onClick={addPlaceHandler} className={"btn btn-primary"}>Додати місце</button>
                        </td>
                    </tr>
                    <tr className={"border border-3 border-top-0 border-bottom-0"}>
                        <td>
                            Послуга "Пакування"
                        </td>
                        <td className={"d-flex align-items-center"}>
                            <input onInput={showPackageHandler} {...register("Packaging")} className={"form-check-inline ms-2 big-checkbox"}
                                   type="checkbox"/>
                            <a className={"btn btn-primary"}
                               href="https://novaposhta.ua/uploads/misc/doc/Dodatkovi_poslygi.pdf" target="_blank">Тарифи
                                пакування</a>
                        </td>
                    </tr>
                    <tr className={"d-none border border-3 border-top-0 border-bottom-0"}>
                        <td></td>
                        {places.map((item, index) => (
                            <td className={"d-flex align-items-center"}>
                                <select {...register(`packages.package${index+1}.packageType`)} required={withPackage} className={"form-select form-select-sm"}>
                                    <option value=""></option>
                                    <option value="box2kg">Коробка (2 кг)</option>
                                    <option value="box5kg">Коробка (5 кг)</option>
                                </select>
                                <label className={"ms-2"}>
                                    К-ість:
                                    <input className={"w-50 text-center"} value={count[index]} type="number" disabled/>
                                </label>
                            </td>
                        ))}
                    </tr>
                    <tr className={"border border-3 border-top-0 border-bottom-0"}>
                        <td>
                            Послуга "Підйом на поверх"
                        </td>
                        <td>
                            <input {...register("CountOfFloors")} placeholder={"кількість поверхів"}
                                   className={"form-control"} type="number"/>
                        </td>
                        <td className={"d-flex align-items-center"}>
                            <label className={"mt-2"} htmlFor="lift">Ліфт:</label>
                            <input {...register("lift")} id={"lift"}
                                   className={"form-check-inline ms-2 big-checkbox mt-2"} type="checkbox"/>
                        </td>
                    </tr>
                    <tr className={"border border-3 border-top-0"}>
                        <td>
                            Послуга "Зворотна доставка"
                        </td>
                        <td>
                            <input onInput={showReturnShipHandler} {...register("ReturnShipping")} className={"form-check-inline ms-2 big-checkbox"}
                                   type="checkbox"/>
                        </td>
                    </tr>
                    <tr className={"border border-3 border-top-0 d-none"}>
                        <td>Вид зворотної доставки</td>
                        <td>
                            <select className={"form-select form-select-sm"} required={returnShip} {...register("TypeOfReturnShiping")}>
                                <option value="Documents">Документи</option>
                                <option value="Money">Грошовий переказ</option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className={"mx-auto mt-2"}>
                    <button type={"submit"} className={"btn btn-primary"}>Розрахувати вартість</button>
                    <button type={"reset"} className={"btn btn-danger ms-2"}>Очистити</button>
                </div>
            </form>
        </div>
    );
};

export default Task2;