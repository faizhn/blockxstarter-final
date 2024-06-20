import { useGlobalState } from '../store'
import { FaProjectDiagram, FaHandsHelping, FaDonate } from 'react-icons/fa'

const Hero = () => {
  const [stats] = useGlobalState('stats')

  return (
    <div className="text-center bg-black text-white py-20 px-6">
      <h1
        className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12"
      >
        <span className="capitalize">Wujudkan Project Bersama</span>
        <br />
        <span className="uppercase text-green-600">blockxstarter</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        <div className="flex flex-col justify-center items-center h-32 bg-gray-800 rounded-lg shadow-lg p-4">
          <FaProjectDiagram className="text-3xl text-[#3ABEF9] mb-2" />
          <span className="text-2xl font-bold text-[#3ABEF9] leading-5">
            {stats?.totalProjects || 0}
          </span>
          <span className="text-lg">Total Project</span>
        </div>
        <div className="flex flex-col justify-center items-center h-32 bg-gray-800 rounded-lg shadow-lg p-4">
          <FaHandsHelping className="text-3xl text-[#3ABEF9] mb-2" />
          <span className="text-2xl font-bold text-[#3ABEF9] leading-5">
            {stats?.totalBacking || 0}
          </span>
          <span className="text-lg">Total Dukungan</span>
        </div>
        <div className="flex flex-col justify-center items-center h-32 bg-gray-800 rounded-lg shadow-lg p-4">
          <FaDonate className="text-3xl text-[#3ABEF9] mb-2" />
          <span className="text-2xl font-bold text-[#3ABEF9] leading-5">
            {stats?.totalDonations || 0} ETH
          </span>
          <span className="text-lg">Total Donasi</span>
        </div>
      </div>
    </div>
  )
}

export default Hero
