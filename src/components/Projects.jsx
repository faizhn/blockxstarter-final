import Identicons from 'react-identicons';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEthereum } from 'react-icons/fa';
import { truncate, daysRemaining } from '../store';

const Projects = ({ projects }) => {
  const [end, setEnd] = useState(4);
  const [count] = useState(4);
  const [collection, setCollection] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCollection = () => {
    if (!selectedCategory) {
      return projects.slice(0, end);
    } else {
      return projects.filter(project => project.category === selectedCategory).slice(0, end);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setEnd(4);
  };

  useEffect(() => {
    setCollection(getCollection());
  }, [projects, end, selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        if (projects.length > collection.length) {
          setEnd(end + count);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [end, collection, projects, count]);

  return (
    <div className="flex flex-col px-6 mb-7">
      <div className="flex justify-center gap-4 mb-5 py-3 flex-wrap">
        {['Semua', 'Teknologi Informasi', 'Keuangan', 'Kesehatan', 'Pendidikan', 'Seni dan Budaya', 'Lingkungan'].map((category, index) => (
          <button
            key={index}
            className={`text-sm font-medium py-1.5 px-4 rounded-full shadow-md transition-transform duration-300 ${
              selectedCategory === (category === 'Semua' ? null : category)
                ? 'bg-blue-600 text-white transform scale-105'
                : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-100'
            }`}
            onClick={() => handleCategoryClick(category === 'Semua' ? null : category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collection.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const expired = new Date().getTime() > Number(project?.expiresAt + '000');

  return (
    <div id="projects" className="rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300">
      <Link to={'/projects/' + project.id} className="block">
        <div className="overflow-hidden rounded-t-lg">
          <img
            src={project.imageURL}
            alt={project.title}
            className="h-64 w-full object-cover transform hover:scale-105 transition duration-300"
          />
        </div>
        
        <div className="p-4">
          <h5 className="text-xl font-semibold mb-2">{truncate(project.title, 25, 0, 28)}</h5>

          <div className="flex items-center mb-3">
            <Identicons className="rounded-full shadow-md" string={project.owner} size={15} />
            <small className="text-gray-700 ml-2">{truncate(project.owner, 4, 4, 11)}</small>
          </div>

          <small className="text-gray-500 block mb-3">
            {expired ? 'Berakhir' : `${daysRemaining(project.expiresAt)} tersisa`}
          </small>

          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-3">
            <div
              className="bg-green-600 h-full text-xs font-medium text-green-100 text-center leading-none"
              style={{ width: `${(project.raised / project.cost) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center mb-3">
            <div>
              <small className="text-sm font-bold">
                {project.raised} ETH Terkumpul ({((project.raised / project.cost) * 100).toFixed(2)}%)
              </small>
              <small className="text-xs flex items-center text-gray-500 mt-1">
                <FaEthereum className="mr-1" />
                <span>{project.cost} ETH</span>
              </small>
            </div>
            <small
              className={`text-sm font-bold ${
                expired ? 'text-red-500' : 
                project.status === 0 ? 'text-blue-500' :
                project.status === 1 ? 'text-green-500' :
                project.status === 2 ? 'text-orange-500' :
                project.status === 3 ? 'text-gray-600' :
                'text-purple-500'
              }`}
            >
              {expired ? 'Berakhir' : 
                project.status === 0 ? 'Terbuka' :
                project.status === 1 ? 'Diterima' :
                project.status === 2 ? 'Dikembalikan' :
                project.status === 3 ? 'Dihapus' :
                'Dibayar'
              }
            </small>
          </div>

          <div className="flex justify-between items-center text-sm font-bold">
            <small>{project.backers} Dukungan{project.backers === 1 ? '' : ''}</small>
            <small className="text-gray-500">
              <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs font-semibold">
                {project.category}
              </span>
            </small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Projects;
