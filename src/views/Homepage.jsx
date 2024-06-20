import React from 'react'
import Navbar from '../components/Navbar';
import Why from '../components/Why';
import Newsletter from '../components/Newsletter';
import Ablockchain from '../components/Ablockchain';
import Footer from '../components/Footer';
import Title from '../components/Title';

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Title />
      <Why />
      <Newsletter />
      <Ablockchain />
      <Footer />
    </>
  );
}

export default Homepage