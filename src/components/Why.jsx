import React from 'react'
import gambar1 from '../assets/gambar1.png'
import { Link } from 'react-router-dom'

const Why = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
        <div className='max-w-[1248px] mx-auto grid md:grid-cols-2'>
            <img className='w-[500px] mx-auto my-4 p-5' src={gambar1} alt='/' />
            <div className='flex flex-col justify-center'>
                <p className='text-[#00cf79] font-bold'>SISTEM CROWDFUNDING BERTEKNOLOGI BLOCKCHAIN</p>
                <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Kelebihan Crowdfunding Blockchain?</h1>
                <p>
                Blocxstarter berbasis crowdfunding blockchain menawarkan transparansi tinggi, keamanan kuat, 
                dan menghilangkan perantara atau pihak ketiga. Jaringan terdesentralisasi ini memungkinkan akses global, 
                memberikan peluang bagi pengguna untuk menjangkau investor di seluruh dunia. Dengan smart contracts, dana dikelola otomatis berdasarkan kesepakatan yang telah ditetapkan, 
                memberikan perlindungan tambahan bagi investor. Selain itu, token yang diterbitkan dapat diperdagangkan, memberikan likuiditas dan model partisipasi yang lebih demokratis. 
                Secara keseluruhan, blockchain membawa inovasi dan efisiensi baru ke dalam model crowdfunding, menjadikannya pilihan yang lebih menarik dan terpercaya.
                </p>
                <button className='bg-black text-[#8c6dfd] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>
                    <Link to='/projects'>
                        Mulai Sekarang
                    </Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Why