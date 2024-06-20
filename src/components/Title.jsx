import React from 'react';
import { Link } from 'react-router-dom';
import { ReactTyped } from 'react-typed';

const Title = () => {
  return (
    <div className='text-white bg-black'>
        <div className='max-w-[800px] mt-[-48px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='text-[#00cf79] font-bold p-2'>BlockXStarter</p>
            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Wujudkan Project Anda Menjadi Nyata</h1>
            <div className='flex justify-center items-center'>
                <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>Sistem</p>
                <ReactTyped 
                  className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
                  strings={['KONSENSUS', 'IMMUTABLE', 'TRANSPARAN', 'DESENTRALISASI']} 
                  typeSpeed={120} 
                  backSpeed={140} 
                  loop 
                />
            </div>
            <button className='bg-[#8c6dfd] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black hover:bg-[#5E1675]'>
              <Link to='/projects'>
                Mulai Sekarang ➤
              </Link>
            </button>
        </div>
    </div>
  )
}

export default Title;
