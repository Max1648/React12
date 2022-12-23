import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ProductItem from "../components/ProductItem";

const Search = () => {
    const {searchQuery} = useParams()
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`https://dummyjson.com/products/search?q=${searchQuery ?? ""}`)
            .then(res=>res.json())
            .then(json => {
                console.log(json)
                console.log(searchQuery)
                setProducts(json.products)
            })
    }, [ ])
    useEffect(() => {
        fetch(`https://dummyjson.com/products/search?q=${searchQuery ?? ""}`)
            .then(res=>res.json())
            .then(json => {
                console.log(json)
                console.log(searchQuery)
                setProducts(json.products)
            })
    }, [searchQuery])
    return (
        <div className={"container mt-4"}>
            {products.map(item => (
                <ProductItem onClick={() => navigate(`/product/${item.id}`)} title={item.title} image={item.thumbnail} price={item.price}/>
            ))}
        </div>
    );
};

export default Search;