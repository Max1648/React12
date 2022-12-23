import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Carousel} from "react-bootstrap";

const ProductPage = () => {
    const {productId} = useParams()
    const [product, setProduct] = useState(null)
    useEffect(() => {
        fetch(`https://dummyjson.com/products/${productId}`)
            .then(res => res.json())
            .then(json => {
                setProduct(json)
            })
    }, [])
    return (
        <div className={'container'}>
            <div className="mx-auto mt-4 w-75 text-center">
                <Carousel variant={'dark'} style={{height: 650}}
                          className={"w-50 border-4 border-dark border rounded-4 d-flex align-items-center mx-auto"}>
                    {product != null ? product.images.map(item => (
                        <Carousel.Item>
                            <img
                                className="d-block w-100 mx-auto"
                                src={item}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )) : <>Завантаження...</>}
                </Carousel>
                <div className={"w-50 p-2 mt-3 border-4 border-dark rounded-4 border mx-auto"}>
                    {product != null ? (
                        <>
                            <h5>Ціна: {Math.floor(product.price * 40)} грн</h5>
                            <h5>Рейтинг: {product.rating}</h5>
                            <h5>На складі: {product.stock}</h5>
                            <h5>Бренд: {product.brand}</h5>
                            <h5>Категорія: {product.category}</h5>
                        </>
                    ) : <>Завантаження...</>}

                </div>
            </div>
        </div>
    );
};

export default ProductPage;