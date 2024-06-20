import React from 'react'
import block from '../assets/block.png'
import {
    FaFacebookSquare,
    FaInstagram,
    FaTwitterSquare,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='max-w-[1940px] mx-auto bg-black py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
        <div>
        <img src={block} alt="/" style={{ width: '250px', height: 'auto' }} />
        <p className='py-4'>Selamat datang di BlockXStarter! Platform antara para pencari dana dan proyek-proyek berbasis blockchain.</p>
        <div className='flex justify-between md:w-[75%] my-6'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
        </div>
        </div>
        <div className='lg:col-span-2 flex justify-between mt-6'>
            <div>
                <h6 className='font-medium text-gray-400'>Kontak Kami</h6>
                <ul>
                    <li className='py-2 text-sm' >Email: support@blockxstarter.blockchain</li>
                    <li className='py-2 text-sm'>Telepon: +62 896 5624 5757</li>
                </ul>
            </div>
            <div>
                <h6 className='font-medium text-gray-400'>Tautan Cepat</h6>
                <ul>
                    <li className='py-2 text-sm'>Beranda</li>
                    <li className='py-2 text-sm'>Proyek</li>
                </ul>
            </div>
            <div>
                <h6 className='font-medium text-gray-400'>Legal</h6>
                <ul>
                    <li className='py-2 text-sm'>Kebijakan Privasi</li>
                    <li className='py-2 text-sm'>Syarat & Ketentuan</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer