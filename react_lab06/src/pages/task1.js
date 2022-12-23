import React, {useEffect, useState} from 'react';

const Task1 = () => {
    const [titleError,setTitleError] = useState("Це поле не може бути порожнім")
    const [emailError,setEmailError] = useState("Це поле не може бути порожнім")
    const [titleDirty,setTitleDirty] = useState(false)
    const [emailDirty,setEmailDirty] = useState(false)
    const [formValid, setFormValid] = useState(false)

    const emailHandler = (e) => {
        const validation = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/u
        if (!validation.test(String(e.target.value).toLowerCase())){
            setEmailError("Ви ввели не коректну email адресу!")
        }else{
            setEmailError("")
        }
    }

    const titleHandler = (e) => {
        if (e.target.value === ""){
            setTitleError("Це поле не може бути порожнім")
        }else{
            setTitleError("")
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name){
            case 'email':
                setEmailDirty(true)
                break;
            case 'title':
                setTitleDirty(true)
                break
            default:
                break;
        }
    }

    const submitHandler = e => {
        e.preventDefault()
        console.group("Form results:")
        console.log(`Name - ${e.target.name.value}`)
        console.log(`Email - ${e.target.email.value}`)
        console.log(`Title - ${e.target.title.value}`)
        console.log(`Description - ${e.target.description.value}`)
        console.groupEnd()
    }

    useEffect(() => {
        if (emailError || titleError){
            setFormValid(false)
        }else{
            setFormValid(true)
        }
    }, [emailError, titleError])
    return (
        <div className={"position-absolute start-50 top-50 translate-middle p-5 border border-3 border-dark rounded-3"}>
            <h5 className={"text-center"}>Зворотній зв'язок</h5>
            <p className={"text-center"}>Задай своє запитання, або повідом про порушення під час вступної кампанії</p>
            <hr/>
            <form onSubmit={submitHandler}>
                <div className={"mb-3"}>
                    <input name={"name"} className={"form-control"} type="text" placeholder={"Ім'я"}/>
                </div>
                <div className={"mb-3"}>
                    <input onChange={e => emailHandler(e)} onBlur={e => blurHandler(e)} className={"form-control"} name={"email"} type="text" placeholder={"E-mail*"}/>
                    {(emailError && emailDirty) && <p className={"text-danger"}>{emailError}</p>}
                </div>
                <div className={"mb-3"}>
                    <input onChange={e => titleHandler(e)} onBlur={e => blurHandler(e)} className={"form-control"} name={"title"} type="text" placeholder={"Тема*"}/>
                    {(titleError && titleDirty) && <p className={"text-danger"}>{titleError}</p>}
                </div>
                <div className="form-floating mb-3">
                    <textarea name={"description"} className="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label className={"text-muted"} htmlFor="floatingTextarea">Comments</label>
                </div>
                <button disabled={!formValid} className={"btn btn-primary"} type={"submit"}>Відправити</button>
            </form>
        </div>
    );
};

export default Task1;