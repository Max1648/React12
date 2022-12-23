import React, {useEffect, useState} from 'react';
import {NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

const Navbar = () => {
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res=>res.json())
            .then(json => setCategories(json))

    }, [ ])
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className={"navbar-brand"} to={"/"}>Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={"nav-link"} to={'/'}>Home</Link>
                            </li>
                            <li>
                                <NavDropdown title="Categories" id="basic-nav-dropdown">
                                    {categories.map((item,index) => (
                                        <Link key={index} className={"text-decoration-none text-dark dropdown-item"} to={`/category/${item}/products`}>{item}</Link>
                                    ))}
                                </NavDropdown>
                            </li>
                        </ul>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            navigate(`products/search/${e.currentTarget.search.value}`)
                        }} className="d-flex" role="search">
                            <input id={"search"} className="form-control me-2" type="text" placeholder="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;