import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ProductItem from "../components/ProductItem";

const Category = () => {
    const {category} = useParams()
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then(res=>res.json())
            .then(json => {
                console.log(json)
                setProducts(json.products)
            })

    }, [category])
    return (
        <div className={"container mt-4"}>
            {products.map(item => (
                <ProductItem onClick={() => navigate(`/product/${item.id}`)} title={item.title} image={item.thumbnail} price={item.price}/>
            ))}
        </div>
    );
};

export default Category;