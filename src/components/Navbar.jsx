import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className='sticky top-0 z-50 flex justify-between items-center h-24 w-full max-w-[1940px] mx-auto px-4 bg-[#000300] text-white'>
            <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} />
            <ul className='hidden md:flex'>
                <li className='p-4'>
                    <Link to='/'>
                        Halaman Utama
                    </Link>
                </li>
                <li className='p-4'>
                    <Link to='/projects'>
                        Semua Projects
                    </Link>
                </li>
            </ul>
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
            <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'fixed left-[-100%] ease-in-out duration-500'}>
                <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} className='p-4' />
                <ul className='uppercase p-4'>
                    <li className='p-4 border-b border-gray-600'>
                        <Link to='/' onClick={handleNav}>
                            Halaman Utama
                        </Link>
                    </li>
                    <li className='p-4 border-b border-gray-600'>
                        <Link to='/projects' onClick={handleNav}>
                            Semua Projects
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
