import React, {useEffect, useState} from 'react';
import ProductItem from "../components/ProductItem";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`https://dummyjson.com/products/`)
            .then(res=>res.json())
            .then(json => {
                setProducts(json.products)
            })
    }, [ ])
    return (
        <div className={"container mt-4"}>
            {products.map(item => (
                <ProductItem onClick={() => navigate(`/product/${item.id}`)} title={item.title} image={item.thumbnail} price={item.price}/>
            ))}
        </div>
    );
};

export default Home;