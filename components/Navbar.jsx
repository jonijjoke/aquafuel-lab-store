'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import  Cart from './Cart';
import { useStateContext } from '@/context/StateContext';

const Navbar = ({className}) => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navbarStyle, setNavbarStyle] = useState({ top: '0' });

  
  useEffect(() => {
    const handleScroll = () => {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop) {
        setNavbarStyle({ top: '-50px' });
      } else {
        setNavbarStyle({ top: '0' });
      }

      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };


    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
      <div>
        <div className='navbar-container' style={navbarStyle}>
        <p className='logo'>
            <Link href='/'>Aquafuel Lab</Link>
        </p>
        <div className='shop-about'>
            <p className='shop'>
                <Link href='/'>Shop</Link>
            </p>
            <p className='about'>
                <Link href='/'>About</Link>
            </p>
        </div>

        <button
            type='button'
            className='cart-icon'
            onClick={() => setShowCart(true)}
        >
            <AiOutlineShopping />
            <span className='cart-item-qty'>{totalQuantities}</span>
        </button>
        
        </div>,
        {showCart && <Cart />}
    </div>  
        )
};

export default Navbar;