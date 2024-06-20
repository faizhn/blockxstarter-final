import { FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'
import crowd from '../assets/crowd.png'
import ProjectDetails from './ProjectDetails'

const DeleteProject = ({ project }) => {
  const [deleteModal] = useGlobalState('deleteModal')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    await deleteProject(project?.id)
    toast.success('Project telah berhasil dihapus.')
    setGlobalState('deleteModal', 'scale-0')
    navigate(ProjectDetails)
  }

  const closeModal = () => {
    setGlobalState('deleteModal', 'scale-0')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${deleteModal}`}
      onClick={closeModal}
    >
      <div
        className="bg-white shadow-xl rounded-xl w-11/12 md:w-2/5 h-auto p-6 transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <p className="text-lg font-semibold text-gray-800">{project?.title}</p>
            <button
              onClick={closeModal}
              type="button"
              className="border-0 bg-transparent text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="flex justify-center items-center mt-5">
            <div className="rounded-xl overflow-hidden h-20 w-20 border">
              <img
                src={project?.imageURL || crowd}
                alt={project?.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center text-center mt-5">
            <p className="text-lg text-gray-700">Anda yakin ingin menghapus proyek ini?</p>
            <small className="text-red-500 mt-1">Tindakan ini tidak dapat diurungkan.</small>
          </div>

          <button
            className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-md leading-tight rounded-full shadow-md hover:bg-red-700 focus:outline-none transition duration-150 ease-in-out mt-5"
            onClick={handleSubmit}
          >
            Hapus Project
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteProject
