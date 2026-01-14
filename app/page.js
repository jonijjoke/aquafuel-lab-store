import product from '@/sanity/schemaTypes/product'
import React from 'react'

import { client } from '../lib/client'
import { Product, FooterBanner, HeroBanner } from '@/components';
import { Toaster } from 'react-hot-toast';


async function getData() {
    const query = '*[_type == "product"]';
    const products = await client.fetch(query);
    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);
    return { products, bannerData }
}


const Home = async () => {
    const { products, bannerData } = await getData();
  return (
    <div>
         <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    <div className="products-heading">
      <h2>Fuel your water with vitamins</h2>
      <p></p>
    </div>

    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
  )}


export default Home
