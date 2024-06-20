import React, { useState, useEffect } from 'react';
import { FaTimes, FaEthereum } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { backProject } from '../services/blockchain';
import { useGlobalState, setGlobalState } from '../store';
import crowd from '../assets/crowd.png';

const BackProject = ({ project }) => {
  const [backModal] = useGlobalState('backModal');
  const [amount, setAmount] = useState('');
  const [conversionRate, setConversionRate] = useState({ idr: null, usd: null });
  const [convertedAmount, setConvertedAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('idr');

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=idr,usd');
        const data = await response.json();
        setConversionRate({ idr: data.ethereum.idr, usd: data.ethereum.usd });
      } catch (error) {
        console.error('Tingkat konversi terdapat kesalahan:', error);
      }
    };

    fetchConversionRate();
  }, []);

  useEffect(() => {
    if (conversionRate[selectedCurrency] && amount) {
      const converted = (parseFloat(amount) * conversionRate[selectedCurrency]).toLocaleString(selectedCurrency === 'idr' ? 'id-ID' : 'en-US', {
        style: 'currency',
        currency: selectedCurrency.toUpperCase()
      });
      setConvertedAmount(converted);
    } else {
      setConvertedAmount('');
    }
  }, [amount, conversionRate, selectedCurrency]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return;

    await backProject(project?.id, amount);
    toast.success('Project telah berhasil didukung.');
    setGlobalState('backModal', 'scale-0');
  };

  const handleClickOutside = (e) => {
    if (e.target.id === 'modal-overlay') {
      setGlobalState('backModal', 'scale-0');
    }
  };

  return (
    <div
      id="modal-overlay"
      className={`fixed top-0 left-0 w-screen h-screen flex
      items-center justify-center bg-black bg-opacity-50
      transform transition-transform duration-300 ${backModal}`}
      onClick={handleClickOutside}
    >
      <div
        className="bg-white shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{project?.title}</p>
            <button
              onClick={() => setGlobalState('backModal', 'scale-0')}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center items-center mt-5">
            <div className="rounded-xl overflow-hidden h-20 w-20">
              <img
                src={project?.imageURL || crowd}
                alt={project?.title}
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <FaEthereum className="text-gray-500 text-xl mx-2" />
            <input
              className="block w-full bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0"
              type="number"
              step={0.0001}
              min={0.0001}
              name="amount"
              placeholder="Jumlah (ETH)"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              required
            />
            <select
              className="block bg-transparent border-0 text-sm text-slate-500 focus:outline-none focus:ring-0"
              onChange={(e) => setSelectedCurrency(e.target.value)}
              value={selectedCurrency}
            >
              <option value="idr">IDR</option>
              <option value="usd">USD</option>
            </select>
          </div>

          {convertedAmount && (
            <div className="mt-2 text-sm text-gray-500">{convertedAmount}</div>
          )}

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-md leading-tight rounded-full shadow-md hover:bg-green-700 mt-5"
          >
            Dukung Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default BackProject;
