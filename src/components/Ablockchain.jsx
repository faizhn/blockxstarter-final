import React from 'react'
import gambar2 from '../assets/gambar2.png'

const Ablockchain = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
        <div className='max-w-[1248px] mx-auto grid md:grid-cols-2'>
            <img className='w-[500px] mx-auto my-4 p-5' src={gambar2} alt='/' style={{ borderRadius: '10%' }} />
            <div className='flex flex-col justify-center'>
                <p className='text-[#00cf79] font-bold'>SISTEM CROWDFUNDING BERTEKNOLOGI BLOCKCHAIN</p>
                <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Apa Itu Blockchain?</h1>
                <p>
                Blockchain adalah teknologi penyimpanan data yang terdesentralisasi dan aman, terdiri dari blok-blok yang saling terhubung dan diamankan dengan kriptografi. 
                Setiap blok mencatat transaksi dan terhubung dengan blok sebelumnya, sehingga sulit diubah tanpa konsensus mayoritas dalam jaringan. Teknologi ini transparan karena semua peserta dapat melihat semua transaksi, 
                dan desentralisasi memastikan tidak ada otoritas tunggal yang mengontrol jaringan. Keamanan dijamin oleh teknik kriptografi, membuat data tahan terhadap manipulasi. Selain itu, blockchain memungkinkan penggunaan smart contracts untuk otomatisasi proses bisnis. 
                Pertama dikenal melalui Bitcoin, blockchain memiliki aplikasi luas di berbagai industri, seperti keuangan, logistik, dan kesehatan.
                </p>
            </div>
        </div>
    </div>
  )
}

export default Ablockchain