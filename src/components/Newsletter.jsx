import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailClick = () => {
    if (!email || !email.includes('@')) {
      alert('Mohon masukkan alamat email yang valid.');
      return;
    }
    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=developerfaiz@gmail.com`;
  };

  return (
    <div className='w-full py-16 text-white px-4 bg-black'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Ingin informasi lebih detail?</h1>
          <p>Dapat menghubungi via email.</p>
        </div>
        <div className='my-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input className='p-3 flex w-full rounded-md text-black' type='email' placeholder='Masukkan Email' value={email} onChange={handleEmailChange} />
            <button className='bg-[#00df9a] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3' onClick={handleEmailClick}>Kirim Email</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
