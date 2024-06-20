import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connectWallet } from '../services/blockchain';
import { truncate, useGlobalState, setGlobalState } from '../store';
import { FaBars, FaHome, FaPlus, FaProjectDiagram } from 'react-icons/fa';

import logo from '../assets/logo.png';

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const openCreateModal = () => {
    setGlobalState('createModal', 'scale-100');
    navigate('/projects');
  };

  return (
    <header className='flex justify-between items-center h-24 max-w-[1940px] mx-auto px-4 bg-black'>
      <Link to='/'>
        <img src={logo} alt='/' style={{ width: '200px', height: 'auto' }} />
      </Link>

      <div className='flex space-x-4 justify-center relative'>
        <button
          type='button'
          className='inline-flex items-center px-4 py-2 text-white bg-[#2e3033] border border-[#2e3033] rounded-md transition duration-300 hover:bg-[#0e0f10] hover:border-[#0e0f10]'
          onClick={toggleDropdown}
        >
          <FaBars />
          <span className="ml-2">Menu</span>
        </button>

        {showDropdown && (
          <div className='absolute z-10 top-full left-0 w-48 bg-white border rounded shadow-md' onMouseLeave={closeDropdown}>
            <Link to='/' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>
              <FaHome className='inline-block mr-2' /> Halaman Utama
            </Link>
            <Link to='/projects' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>
              <FaProjectDiagram className='inline-block mr-2' /> Project
            </Link>
            <button
              type="button"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
              onClick={openCreateModal}
            >
              <FaPlus className='inline-block mr-2' /> Tambah Project
            </button>
          </div>
        )}

        {connectedAccount ? (
          <button
            type='button'
            className='inline-block px-6 py-2.5 bg-[#8c6dfd] text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-[#5E1675]'
          >
            {truncate(connectedAccount, 4, 4, 11)}
          </button>
        ) : (
          <button
            type='button'
            className='inline-block px-6 py-2.5 bg-[#8c6dfd] text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-[#5E1675]'
            onClick={connectWallet}
          >
            Hubungkan Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
