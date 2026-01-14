"use client";

import React, { useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { urlFor } from '@/lib/client';
import { Product } from '@/components';
import { useStateContext } from '@/context/StateContext';
import Navbar from './Navbar';

const ProductDetailsClient = ({ product, products }) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, setQty, onAdd } = useStateContext();

    useEffect(() => {
        setQty(1);
    }, [product, setQty])
    
    return (
        <div>
        
            <Navbar className='product-detail-navbar' />
        
        <div className="product-detail-container">
            <div>
            <div className="image-container">
                <img src={urlFor(image && image[index])} className="product-detail-image" />
            </div>
            <div className="small-images-container">
                {image?.map((item, i) => (
                <img 
                    key={i}
                    src={urlFor(item)}
                    className={i === index ? 'small-image selected-image' : 'small-image'}
                    onMouseEnter={() => setIndex(i)}
                />
                ))}
            </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
            </div>
            <p>
                (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'>{price} €</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
                <span className='minus' onClick={decQty}>
                    <AiOutlineMinus />
                </span>
                <span className='num'>
                    {qty}
                </span>
                <span className='plus' onClick={incQty}>
                    <AiOutlinePlus />
                </span>
            </p>
           </div>
           <div className='buttons'>
            <button className='add-to-cart' type='button' onClick={() => onAdd(product, qty)}>
                Add to Cart
            </button>
            <button className='buy-now' type='button' onClick={null}>
                Buy Now
            </button>
            </div>
          </div>
        </div>

        <div className='maylike-products-wrapper'>
          <h2>You may also like</h2>
          <div className='marquee'>
            <div className='maylike-products-container track'>
                {products.map((item) => (
                    <Product key={item._id} product={item}/>
                ))}
            </div>
          </div>

      </div>
      </div>
    
);
};



export default ProductDetailsClient;