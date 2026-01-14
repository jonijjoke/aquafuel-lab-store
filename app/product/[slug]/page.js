
import React from 'react'
import { client, urlFor } from '../../../lib/client'
import { Products } from '../../../components'
import product from '@/sanity/schemaTypes/product'
import ProductDetailsClient from '@/components/ProductDetailsClient';



export async function generateStaticParams() {
    const productsQuery = `*[_type == "product"] { slug { current } }`;
    const products = await client.fetch(productsQuery);
  
    return products.map((product) => ({
      slug: product.slug.current,
    }));
  }
  
  export default async function ProductPage({ params }) {
    const { slug } = params;
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';
  
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
return <ProductDetailsClient product={product} products={products} />;
}