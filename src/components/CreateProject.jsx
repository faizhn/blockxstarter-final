import { useState, useEffect } from 'react'
import { FaTimes, FaEthereum } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'
import crowd from '../assets/crowd.png'

const CreateProject = () => {
  const [createModal] = useGlobalState('createModal')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [costETH, setCostETH] = useState('')
  const [costIDR, setCostIDR] = useState('')
  const [costUSD, setCostUSD] = useState('')
  const [formattedCostIDR, setFormattedCostIDR] = useState('')
  const [formattedCostUSD, setFormattedCostUSD] = useState('')
  const [date, setDate] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [category, setCategory] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('IDR')

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=idr,usd'
        )
        const data = await response.json()
        const ethToIdrRate = data.ethereum.idr
        const ethToUsdRate = data.ethereum.usd
        if (ethToIdrRate && costETH) {
          const costInIDR = costETH * ethToIdrRate
          setCostIDR(costInIDR.toFixed(2))
          setFormattedCostIDR(formatNumberWithCommas(costInIDR.toFixed(2)))
        }
        if (ethToUsdRate && costETH) {
          const costInUSD = costETH * ethToUsdRate
          setCostUSD(costInUSD.toFixed(2))
          setFormattedCostUSD(formatNumberWithCommas(costInUSD.toFixed(2)))
        }
      } catch (error) {
        console.error('Tingkat konversi terdapat kesalahan:', error)
      }
    }

    fetchExchangeRate()
  }, [costETH])

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !costETH || !date || !imageURL || !category) return

    const params = {
      title,
      description,
      cost: costETH,
      expiresAt: toTimestamp(date),
      imageURL,
      category,
    }

    await createProject(params)
    toast.success('Project telah berhasil dibuat.')
    onClose()
  }

  const onClose = () => {
    setGlobalState('createModal', 'scale-0')
    reset()
  }

  const reset = () => {
    setTitle('')
    setCostETH('')
    setCostIDR('')
    setCostUSD('')
    setFormattedCostIDR('')
    setFormattedCostUSD('')
    setDescription('')
    setImageURL('')
    setDate('')
    setCategory('')
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const toggleCurrency = () => {
    setSelectedCurrency(selectedCurrency === 'IDR' ? 'USD' : 'IDR')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${createModal}`}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white shadow-xl rounded-xl w-11/12 md:w-2/5 p-8"
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <p className="text-2xl font-semibold">Tambah Project</p>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="flex justify-center items-center mb-6">
            <div className="rounded-xl overflow-hidden h-20 w-20">
              <img
                src={imageURL || crowd}
                alt="project title"
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>

          <div className="mb-6">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full bg-gray-100 border border-gray-300 rounded-lg text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="Teknologi Informasi">Teknologi Informasi</option>
              <option value="Keuangan">Keuangan</option>
              <option value="Kesehatan">Kesehatan</option>
              <option value="Pendidikan">Pendidikan</option>
              <option value="Seni dan Budaya">Seni dan Budaya</option>
              <option value="Lingkungan">Lingkungan</option>
            </select>
          </div>

          <div className="mb-6">
            <input
              className="block w-full bg-gray-100 border border-gray-300 rounded-lg text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              name="title"
              placeholder="Judul"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div className="mb-6">
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg">
              <FaEthereum className="text-gray-500 ml-3" />
              <input
                className="block w-full bg-transparent border-0 text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="number"
                step={0.0001}
                min={0.0001}
                name="costETH"
                placeholder="Biaya (ETH)"
                onChange={(e) => setCostETH(e.target.value)}
                value={costETH}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg">
              <span className="text-gray-500 ml-3">{selectedCurrency === 'IDR' ? 'Rp' : '$'}</span>
              <input
                className="block w-full bg-transparent border-0 text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                name="costCurrency"
                placeholder={`Biaya (${selectedCurrency})`}
                value={selectedCurrency === 'IDR' ? formattedCostIDR : formattedCostUSD}
                readOnly
              />
              <button
                type="button"
                className="ml-4 text-sm text-blue-500 px-2"
                onClick={toggleCurrency}
              >
                {selectedCurrency === 'IDR' ? 'Tampilkan USD' : 'Tampilkan IDR'}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <input
              className="block w-full bg-gray-100 border border-gray-300 rounded-lg text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="date"
              name="date"
              placeholder="Tanggal Berakhir"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
            />
          </div>

          <div className="mb-6">
            <input
              className="block w-full bg-gray-100 border border-gray-300 rounded-lg text-gray-700 py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="url"
              name="imageURL"
              placeholder="URL Gambar"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              required
            />
          </div>

          <div className="mb-6">
            <textarea
              className="block w-full bg-gray-100 border border-gray-300 rounded-lg text-gray-700 py-2 px-3 leading-tight focus:outline-none focus
              focus:bg-white focus:border-gray-500"
              type="text"
              name="description"
              placeholder="Deskripsi"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="inline-block w-full px-6 py-3 bg-green-600 text-white font-medium text-lg leading-tight rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Buat Project
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
