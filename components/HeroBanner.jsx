import React from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client'
import Navbar from '@/components/Navbar'


const HeroBanner = ({ heroBanner }) => {
  if (!heroBanner) {
    return <div>No banner data available</div>;
  }


  const imageUrl = heroBanner.image ? urlFor(heroBanner.image).url() : '/default-image.jpg';

  return (
    <div className='hero-banner-container'>
      
            {/*<div className='text-container'>
                <h1>{heroBanner.largeText1}</h1>
                <p className='beats-solo'>{heroBanner.smallText}</p>
                <h3></h3>
                
            </div>*/}
        {}
        <Navbar />
        <div className='hero-image-wrapper'>    
            <img
            src={imageUrl}
            alt="Banner Image"
            className="hero-banner-image"
            />
        </div>

        {/*<div>
            <Link href={`/product/${heroBanner.product}`}>
                <button type='button'>{heroBanner.buttonText}</button>
            </Link>
        
                <div className='desc'>
                    <h5></h5>
                    <p></p>
                </div>
                
        </div>*/}
      
    </div>
  )
}

export default HeroBanner
