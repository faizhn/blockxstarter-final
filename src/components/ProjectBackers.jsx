import { FaEthereum, FaArrowRight } from 'react-icons/fa';
import Identicon from 'react-identicons';
import Moment from 'react-moment';
import 'moment/locale/id';
import { truncate } from '../store';

const ProjectBackers = ({ backers }) => {
  return (
    <div className="flex flex-col justify-center items-start w-full px-6 mx-auto">
      <div className="overflow-hidden shadow-md rounded-md w-full mb-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dukungan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donasi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pengembalian</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {backers.map((backer, i) => (
              <Backer key={i} backer={backer} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Backer = ({ backer }) => (
  <tr className="hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <Identicon className="h-8 w-8 rounded-full" string={backer.owner} size={25} />
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{truncate(backer.owner, 4, 4, 11)}</div>
          <a href={`https://sepolia.etherscan.io/address/${backer.owner}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline flex items-center mt-1">
            <span>Lihat di Etherscan</span>
            <FaArrowRight className="ml-1" />
          </a>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <FaEthereum className="h-4 w-4 text-gray-400" />
        <div className="ml-2 text-sm text-gray-900">{backer.contribution} ETH</div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={backer.refunded ? "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" : "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"}>{backer.refunded ? 'Ya' : 'Tidak'}</span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"><Moment locale="id" fromNow>{backer.timestamp}</Moment></td>
  </tr>
);

export default ProjectBackers;
